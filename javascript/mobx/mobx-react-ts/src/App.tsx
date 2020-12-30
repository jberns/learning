import React from "react";
import "./App.css";
import { useObserver } from "mobx-react-lite";
import { NewNoteInput } from "./NewNoteInput";
import { useRootStore } from "./RootStateContext";

function App() {
  const { notesStore } = useRootStore();

  return useObserver(() => (
    <div>
      <NewNoteInput addNote={notesStore.addNote} />
      <hr />
      <ul>
        {notesStore.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <hr />
      <p>There are: {notesStore.notesCount} notes!</p>
      <hr/>
      <button onClick={() => notesStore.saveNotes()}>Save</button>
      <button onClick={() => notesStore.loadNotes()}>Load</button>
    </div>
  ));
}

export default App;
