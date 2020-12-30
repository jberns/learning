import React, { MouseEvent, useState } from "react";
import { IWishListItem } from "../models/WishList";
import { WishListItemEdit } from "./WishListItemEdit";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";

export const WishListItemView = ({ item }: { item: IWishListItem }) => {
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
          <button onClick={onSaveEdit}>💾</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </li>
      );
  };

  return isEditing ? (
    renderEditable()
  ) : (
    <li className='item'>
      {item.image && <img alt='Item' src={item.image} />}
      <h3>{item.name}</h3>
      <span>{item.price}</span>
      <span>
        <button onClick={toggleEdit}>Edit</button>
        <button onClick={item.remove}>❌</button>
      </span>
    </li>
  );
};
