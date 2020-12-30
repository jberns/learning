import React, { MouseEvent, useState } from "react";
import { observer } from "mobx-react";

import { WishListItemEdit } from "./WishListItemEdit";
import { WishListItem, IWishList } from "../models/WishList";

export const WishListItemEntry = observer(({ wishList }: {wishList: IWishList}) => {
  const [entry, setEntry] = useState(
    WishListItem.create({ name: " ", price: 0 })
  );

  const onAdd = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    wishList.add(entry);
    setEntry(WishListItem.create({ name: " ", price: 0 }));
  };

  return (
    <div>
      <WishListItemEdit item={entry} />
      <button onClick={onAdd}>✅ Add</button>
    </div>
  );
});
