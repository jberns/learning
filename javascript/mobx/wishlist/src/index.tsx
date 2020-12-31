import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { WishList, IWishList } from "./models/WishList";
import { Group, IGroup, Gender } from "./models/Group";

import { onSnapshot, getSnapshot } from "mobx-state-tree";
import { getNameOfDeclaration } from "typescript";

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

let initialState = {
  users: {
    a342: {
      id: "a342",
      name: "Homer",
      gender: Gender.m,
    },
    fc2: {
      id: "fc2",
      name: "Marge",
      gender: Gender.f,
    },
  },
};

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

const group = Group.create(initialState);
console.log(group);

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
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
