import React from "react";
import { NotesStore } from "./NotesStore";

type NewNoteInputProps = {
  addNote: NotesStore["addNote"];
};

export const NewNoteInput: React.FC<NewNoteInputProps> = ({ addNote }) => {
  const [note, setNote] = React.useState("");

  const updateNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const onAddNoteClick = () => {
    addNote(note)
    setNote("")
  }

  return (
    <div>
      <input
        type='text'
        value={note}
        onChange={updateNote}
        name='note'
        placeholder='Note'
      />
      <button onClick={onAddNoteClick}>Add Note</button>
    </div>
  );
};
