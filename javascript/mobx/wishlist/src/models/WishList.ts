import { types, Instance } from "mobx-state-tree";

const data = {};

interface IWishListItem extends Instance<typeof WishListItem> { }

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: ""
}).actions(self => ({
  changeName(newName: string) {
    self.name = newName
  },
  changePrice(newPrice: number) {
    self.price = newPrice
  },
  changeImage(newImage: string) {
    self.image = newImage
  }
})
)

export const WishList = types.model({
  items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
  add(item: IWishListItem) {
    self.items.push(item)
  }
})
).views(self => ({
  get totalPrice(): number {
    return self.items.reduce((sum, entry) => sum + entry.price, 0)
  }
}))
