import { WishListItemView } from "./WishListItemView";
import { WishListItemEntry } from "./WishListItemEntry";
import { IWishList } from "../models/WishList";

import { observer } from "mobx-react";

export const WishListView = observer(
  ({ wishList }: { wishList: IWishList }) => (
    <div className='list'>
      <div className='bg-blue-300 w-full p-8 flex justify-center font-sans'>
        <div className='rounded bg-gray-200 w-1/2 p-2'>
          <ul>
            {wishList.items.map((item, idx) => (
              <div className='bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter'>
                <WishListItemView key={idx} item={item} />
              </div>
            ))}
          </ul>
          <div className='p-6 m-6 w-full mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4'>
            <div>
              <div className='text-xl font-medium text-black'>Total:</div>$
              {wishList.totalPrice}
            </div>
          </div>
        </div>

      </div>
      
      <WishListItemEntry wishList={wishList} />
    </div>
  )
);
