import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INotes } from "../../models/INotes"

interface notesState {
  notes: INotes[]
}

const initialState: notesState = {
  notes: [],
}

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes(state, action: PayloadAction<{ title: string; content: string }>) {
      state.notes.push({
        id: new Date().toLocaleString(),
        title: action.payload.title,
        content: action.payload.content,
        time: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
        status: "",
      })
    },
  },
})

export const { addNotes } = notesSlice.actions
export default notesSlice.reducer