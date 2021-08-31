import React, { useState, ChangeEvent } from "react";
import logo from "./logo.svg";
import { Observer, observer } from "mobx-react";
import { WishListView } from "./components/WishListView";
import { IWishList } from "./models/WishList";
import { IGroup, IUser, User } from "./models/Group";
import userEvent from "@testing-library/user-event";

type WishListProps = {
  // wishList: IWishList;
  group: IGroup;
};

function App(props: WishListProps) {
  const { group } = props;
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const selectedUser = group.users.get(selectedUserId);

  const onSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  const UserSelect = observer(({ group }: { group: IGroup }) => (
    <select onChange={onSelectUser}>
      <option> - Select User -</option>
      {Array.from(group.users.values()).map((user: IUser) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  ));

  return (
    <div className='App'>
      <button onClick={group.reload}>Reload</button>
      <UserSelect group={group} />
      <button onClick={group.drawLots}>Draw Lots</button>
      {selectedUser && (
        <UserView
          selected={selectedUser}
          recipient={
            selectedUser.recipient
              ? group.users.get(selectedUser.recipient)
              : undefined
          }
        />
      )}
    </div>
  );
}



const UserView = observer(
  ({
    selected,
    recipient,
  }: {
    selected: IUser;
    recipient: IUser | undefined;
  }) => (
    <div>
      <WishListView wishList={selected.wishList} />
      <button onClick={selected.addSuggestionsFlow}>Suggestions</button>
      <hr />

      <h2>{recipient ? recipient.name : ""}</h2>
      {recipient && (
        <WishListView wishList={recipient.wishList} readonly={true} />
      )}
    </div>
  )
);

export default App;
