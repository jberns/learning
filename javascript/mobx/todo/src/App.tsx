import React from "react";
import logo from "./logo.svg";
import { useLocalStore, useObserver, observer } from "mobx-react";

interface IStore {
  bugs: string[];
  addBug: Function;
  bugsCount: number;
}

const init: IStore = {
  bugs: [],
  addBug: Function,
  bugsCount: 0
};

const StoreContext = React.createContext(init);

const StoreProvider: any = ({ children }: any) => {
  const store: IStore = useLocalStore(() => ({
    bugs: ["Centipede", "Beetle"],
    addBug: (bug: string) => {
      store.bugs.push(bug);
    },
    get bugsCount(){
      return store.bugs.length
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(()=> <h1>{store.bugsCount}</h1>)
}

const BugsList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.bugs.map((bug) => (
        <li key={bug}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        store.addBug(bug);
        e.preventDefault();
      }}
    >
      <input
        type='text'
        value={bug}
        onChange={(e) => {
          setBug(e.target.value);
        }}
      />

      <button type='submit'>Add</button>
    </form>
  );
};

function App() {
  return (
    <StoreProvider>
      <div className='App'>
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </div>
    </StoreProvider>
  );
}

export default App;
