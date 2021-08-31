import { types, Instance, flow, getParent, getParentOfType, applySnapshot, getSnapshot, onSnapshot } from "mobx-state-tree"
import { IWishListItem, WishList } from "./WishList"
import { createStorable } from "./Storable"

export interface IUser extends Instance<typeof User> { }
export interface IGroup extends Instance<typeof Group> { }

interface IUserSnapshot {
  [id: string]: IUser
}
export enum Gender {
  m = "m",
  f = "f"
}

export const User = types.compose(types.model({
  id: types.string,
  name: types.string,
  gender: types.enumeration<Gender>("Gender", Object.values(Gender)),
  wishList: types.optional(WishList, {}),
  recipient: types.maybe(types.string)
}).actions(self => ({
  async getSuggestions() {
    const response = await window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
    const suggestions = await response.json()
    this.addSuggestions(suggestions)
  },
  addSuggestions(suggestions: IWishListItem[]) {
    self.wishList.items.push(...suggestions)
  },
  addSuggestionsFlow: flow(function* () {
    const response = yield window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
    const suggestions: IWishListItem[] = yield response.json()
    self.wishList.items.push(...suggestions)
  })
})).views(self => ({
  get other() {
    return getParent(self)
  }
})), createStorable("users", "id"))

export const Group = types.model({
  users: types.map(User)
}).actions(self => {
  let controller: AbortController

  return ({
    afterCreate() {
      this.load()
    },
    load: flow(function* () {
      controller = new window.AbortController()
      try {

        const response = yield window.fetch(
          `http://localhost:3001/users`,
          { signal: controller.signal }
        )
        const users: IUser[] = yield response.json()
        const snapShot = users.reduce((r: IUserSnapshot, e: IUser) => {
          r[e.id] = e
          return r
        }, {})
        applySnapshot(self.users, snapShot)
      } catch (e) {
        console.log("aborted", e.name)
      }
    }),
    reload() {
      if (controller) controller.abort()
      this.load()
    },
    beforeDestroy() {
      if (controller) controller.abort()
    },
    drawLots() {
      let allUsers = Array.from(self.users.values())

      //not enough users
      if (allUsers.length <= 1) return

      //Not assigned to lots
      let remaining = allUsers.slice()

      allUsers.forEach(user => {
        if (remaining.length === 1 && remaining[0] === user) {
          const swapWith = allUsers[Math.floor(Math.random() * allUsers.length)]
          user.recipient = swapWith.recipient
          swapWith.recipient = user.id
          console.log("swapped!")
        } else {
          while (!user.recipient) {
            let recipientIdx = Math.floor(Math.random() * remaining.length)
            if (remaining[recipientIdx] !== user) {
              user.recipient = remaining[recipientIdx].id
              console.log(user.name, remaining[recipientIdx].name)
              remaining.splice(recipientIdx, 1)
            }
          }
        }
      })
    }
  })
}
)