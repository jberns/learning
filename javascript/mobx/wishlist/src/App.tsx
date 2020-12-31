import React, { useState, ChangeEvent } from "react";
import logo from "./logo.svg";

import { WishListView } from "./components/WishListView";
import { IWishList } from "./models/WishList";
import { IGroup, IUser } from "./models/Group";

type WishListProps = {
  // wishList: IWishList;
  group: IGroup;
};

function App(props: WishListProps) {
  const { group } = props;
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const selectedUser = group.users.get(selectedUserId)

  const onSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  return (
    <div className='App'>
      <select onChange={onSelectUser}>
        <option> - Select User -</option>
        {Array.from(group.users.values()).map((user: IUser) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {selectedUser && <WishListView wishList={selectedUser.wishList} />}
    </div>
  );
}

export default App;
