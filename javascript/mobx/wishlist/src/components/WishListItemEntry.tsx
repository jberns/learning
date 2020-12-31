import React, { MouseEvent, useState } from "react";
import { observer } from "mobx-react";

import { WishListItemEdit } from "./WishListItemEdit";
import { WishListItem, IWishList } from "../models/WishList";

export const WishListItemEntry = observer(
  ({ wishList }: { wishList: IWishList }) => {
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
        <div className='p-6 max-w-lg bg-yellow-500 shadow-2xl rounded-lg mx-auto text-center py-2 mt-4'>
          <WishListItemEdit item={entry} />
          <div className='m-6 inline-flex rounded-md bg-white shadow'>
            <button
              className='text-gray-700 font-bold py-2 px-6'
              onClick={onAdd}
            >
              ✅ Add
            </button>
          </div>
        </div>
      </div>
    );
  }
);
