import { WishList, WishListItem } from "./WishList"
import { reaction } from "mobx"
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "Chronicles of Narnia Box Set - C.S. Lewis",
    price: 28.73,
    image: ""
  })

  expect(item.price).toBe(28.73)
  expect(item.image).toBe("")

  item.changeName("Narnia")
  expect(item.name).toBe("Narnia")

})

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [{
      name: "Chronicles of Narnia Box Set - C.S. Lewis",
      price: 28.73,
      image: ""
    }]
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(28.73)
})

it("can add new items", () => {
  const list = WishList.create()
  const patches: any = []
  onPatch(list, snapshot => {
    patches.push(snapshot)
  })

  list.add(WishListItem.create({
    name: "Chesterton",
    price: 10,
  }))

  list.items[0].changePrice(11)

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe("Chesterton")
  list.items[0].changeName("Book of G.K. Chesterton")
  expect(list.items[0].name).toBe("Book of G.K. Chesterton")

  expect(getSnapshot(list)).toEqual(
    {
      items: [{
        name: "Book of G.K. Chesterton",
        price: 11,
        image: "",
      }]
    }
  )

  expect(getSnapshot(list)).toMatchSnapshot()
  expect(patches).toMatchSnapshot()

})

it("calculate the total price of a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Machine Gun Preacher",
        price: 7.35,
      },
      {
        name: "Lego Mindstorms EV3",
        price: 349.95
      }
    ]
  })

  expect(list.totalPrice).toBe(357.3)

  let changed = 0
  reaction(() => list.totalPrice, () => changed++)

  expect(changed).toBe(0)
  console.log(list.totalPrice)
  list.items[0].changeName("Test")
  expect(changed).toBe(0)
  list.items[0].changePrice(10)
  expect(changed).toBe(1)
})

