import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { WishList } from "./models/WishList";

const wishList = WishList.create({
  items: [
    {
      name: "Machine Gun Preacher",
      price: 7.35,
      image:""
    },
    {
      name: "Lego Mindstorms EV3",
      price: 349.95,
      image:""
    },
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <App wishList={wishList} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
