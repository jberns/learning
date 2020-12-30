import React, { ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react";

import { IWishListItem } from "../models/WishList";

type WishListItemEditProps = {
  item: IWishListItem;
};

export const WishListItemEdit = observer(({ item }: WishListItemEditProps) => {
  console.log(item);
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    item.changeName(event.target.value);
  };

  const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value);
    if (!isNaN(price)) item.changePrice(parseFloat(event.target.value));
  };

  return (
    <div className='item-edit'>
      Thing: <input value={item.name} onChange={onNameChange} />
      <br />
      Price: <input value={item.price} onChange={onPriceChange} />
      <br />
    </div>
  );
});
