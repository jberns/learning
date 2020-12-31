import { types, Instance } from "mobx-state-tree"
import { WishList } from "./WishList"

export interface IUser extends Instance<typeof User> { }
export interface IGroup extends Instance<typeof Group> { }

export enum Gender {
  m = "m",
  f = "f"
}
export const User = types.model({
  id: types.string,
  name: types.string,
  gender: types.enumeration<Gender>("Gender", Object.values(Gender)),
  wishList: types.optional(WishList, {})
})

export const Group = types.model({
  users: types.map(User)
})