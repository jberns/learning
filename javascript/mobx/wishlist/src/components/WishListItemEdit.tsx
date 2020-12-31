import React, { ChangeEvent, useState, useEffect } from "react";
import { observer } from "mobx-react";

import { IWishListItem } from "../models/WishList";

type WishListItemEditProps = {
  item: IWishListItem;
};

export const WishListItemEdit = observer(({ item }: WishListItemEditProps) => {
  const [textPrice, setTextPrice] = useState("")
  // setTextPrice(item.price.toString());
  useEffect(()=> {
    if (!isNaN(item.price)) {
      setTextPrice(item.price.toString());
    } else {
      setTextPrice("");
    }
  }, [item])

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    item.changeName(event.target.value);
  };

  const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextPrice(event.target.value);
    const price = parseFloat(event.target.value);
    console.log(price)
    if (!isNaN(price)) {
      item.changePrice(parseFloat(event.target.value));
    } else {
      item.changePrice(0);
    }
  };

  return (
    <div className='item-edit'>
      <div className='justify-center'>
        <div className='rounded-md'>
          <label
            htmlFor='Thing'
            className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            Thing
          </label>
          <input
            id='Thing'
            type='text'
            name='Thing'
            className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
            value={item.name}
            onChange={onNameChange}
            required
          />

          <label
            htmlFor='Price'
            className='block mt-2 text-xs font-semibold text-gray-600 uppercase'
          >
            Price
          </label>
          <input
            id='Price'
            type='text'
            name='Price'
            className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
            value={textPrice}
            onChange={onPriceChange}
            required
          />
        </div>
      </div>
    </div>
  );
});
