import { WishListItemView } from "./WishListItemView";
import { WishListItemEntry } from "./WishListItemEntry";
import { IWishList, IWishListItem } from "../models/WishList";

import { observer } from "mobx-react";

export const WishListView = observer(
  ({ wishList }: { wishList: IWishList }) => (
    <div className='list'>
      <ul>
        {wishList.items.map((item, idx) => (
          <WishListItemView key={idx} item={item} />
        ))}
      </ul>
      Total: {wishList.totalPrice}
      <WishListItemEntry wishList={wishList} />
    </div>
  )
);
