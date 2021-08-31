import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { WishList, IWishList } from "./models/WishList";
import { Group, IGroup, Gender } from "./models/Group";

import { onSnapshot, getSnapshot, addMiddleware } from "mobx-state-tree";

const LOCAL_STORAGE = "wishlistapp";

// let initialState = {
//   items: [
//     {
//       name: "Machine Gun Preacher",
//       price: 7.35,
//       image: "",
//     },
//     {
//       name: "Lego Mindstorms EV3",
//       price: 349.95,
//       image: "",
//     },
//   ],
// };

let initialState = { users: {} };

// //Loading wishlist form local storage
// if (typeof localStorage.getItem(LOCAL_STORAGE) === "string") {
//   const json: IWishList = JSON.parse(
//     localStorage.getItem(LOCAL_STORAGE) || "{}"
//   );
//   if (WishList.is(json)) initialState = json;
// }

// let wishList = WishList.create(initialState);

// onSnapshot(wishList, (snapshot) => {
//   localStorage.setItem(LOCAL_STORAGE, JSON.stringify(snapshot));
// });

declare global {
  interface Window {
    group: any;
  }
}

const group = (window.group = Group.create(initialState));
// group.addUsersFlow();

addMiddleware(group, (call, next) => {
  // console.log(`[${call.type}] ${call.name}`);
  return next(call);
});

//Render App
function renderApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App group={group} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

renderApp();

//Hot Reloading
if (module.hot) {
  module.hot.accept(["./App"], () => {
    //new components
    renderApp();
  });

  module.hot.accept(["./models/WishList"], () => {
    //new model definitions
    // const snapshot = getSnapshot(wishList);
    // wishList = WishList.create(snapshot);
    renderApp();
  });

  module.hot.accept(["./models/Group"], () => {
    //new model definitions
    // const snapshot = getSnapshot(wishList);
    // wishList = WishList.create(snapshot);
    renderApp();
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
