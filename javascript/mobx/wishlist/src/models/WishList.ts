import { types, Instance, destroy, getParentOfType } from "mobx-state-tree";

export interface IWishListItem extends Instance<typeof WishListItem> { }
export interface IWishList extends Instance<typeof WishList> { }

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: "",
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  },
  changePrice(newPrice: number) {
    self.price = newPrice
  },
  changeImage(newImage: string) {
    self.image = newImage
  },
  remove() {
    getParentOfType(self, WishList).remove(self)
  }
})
)

export const WishList = types.model({
  items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
  add(item: IWishListItem) {
    self.items.push(item)
  },
  remove(item: any) {
    destroy(item)
  }
})
).views(self => ({
  get totalPrice(): number {
    return self.items.reduce((sum, entry) => sum + entry.price, 0)
  }
}))
