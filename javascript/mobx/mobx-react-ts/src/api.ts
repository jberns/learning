export const getNotes = (): Promise<string[]> => {
  return fetch("http://localhost:4000/notes").then(res => res.json())
}

export const postNotes = (notes: string[]) => {
  fetch("http://localhost:4000/notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(notes)
  })
}