import { observable, action, makeObservable, computed } from 'mobx'
import { getNotes, postNotes } from './api'

export class NotesStore {
  notes: string[] = []

  constructor() {
    makeObservable(this, {
      notes: observable,
      loadNotes: action,
      saveNotes: action,
      addNote: action,
      notesCount: computed,
    })
  }

  loadNotes = () => {
    getNotes().then(notes => this.notes = notes)
  }

  saveNotes = () => {
    postNotes(this.notes)
  }

  addNote = (note: string) => {
    this.notes.push(note)
  }

  get notesCount(): number {
    return this.notes.length
  }
}

