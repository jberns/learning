import React, { MouseEvent, useState } from "react";
import { IWishListItem } from "../models/WishList";
import { WishListItemEdit } from "./WishListItemEdit";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";

export const WishListItemView = ({
  item,
  readonly,
}: {
  item: IWishListItem;
  readonly: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const itemClone = clone(item);

  const toggleEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const onCancelEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const onSaveEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    applySnapshot(item, getSnapshot(itemClone));
    setIsEditing(false);
  };

  const renderEditable = () => {
    return (
      <li className='Item'>
        <WishListItemEdit item={itemClone} />
        {!readonly && (
          <span className='text-xs flex items-center'>
            <button
              className='m-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none'
              onClick={onSaveEdit}
            >
              💾
            </button>
            <button
              className='m-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-gray-100 rounded shadow ripple hover:shadow-lg hover:bg-gray-200 focus:outline-none'
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </span>
        )}
      </li>
    );
  };

  return isEditing ? (
    renderEditable()
  ) : (
    <li className='item'>
      <h3>{item.name}</h3>
      <span>${item.price}</span>
      {!readonly && (
        <div>
          <span>
            <button
              className='m-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none'
              onClick={toggleEdit}
            >
              Edit
            </button>
            <button
              className='m-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition bg-gray-100 rounded shadow ripple hover:shadow-lg hover:bg-gray-200 focus:outline-none'
              onClick={item.remove}
            >
              ❌
            </button>
          </span>
        </div>
      )}
    </li>
  );
};
