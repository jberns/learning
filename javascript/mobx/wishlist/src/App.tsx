import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { WishListView } from "./components/WishListView";
import { IWishList } from "./models/WishList";

type WishListProps = {
  wishList: IWishList;
};

function App(props: WishListProps) {
  return (
    <div className='App'>
      <WishListView wishList={props.wishList} />
    </div>
  );
}

export default App;
