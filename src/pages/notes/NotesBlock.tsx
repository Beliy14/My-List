import React, { useState } from "react"
import { useAppDispatch } from "../../hooks/hook"
import { addNotes } from "../../store/slices/notesSlice"
import "./notesBlock.css"
import { API } from "../../services/service"
import NotesItem from "./NotesItem"
import { INotes } from "../../models/INotes"

const NotesBlock: React.FC = () => {
  const { data: notes, isLoading, error } = API.useFetchAllNotesQuery("")
  const [createNotes, {}] = API.useCreateNotesMutation()
  const [deleteNotes, {}] = API.useDeleteNotesMutation()
  const [updateNotes] = API.useUpdateNotesMutation()

  const dispatch = useAppDispatch()

  const [titleValue, setTitleValue] = useState("")
  const [contentValue, setContentValue] = useState("")
  const [inputTitleValue, setInputTitleValue] = useState("")
  const [inputContentValue, setInputContentValue] = useState("")

  const addAction = async () => {
    if (titleValue.trim().length && contentValue.trim().length) {
      dispatch(addNotes({ title: titleValue, content: contentValue }))
      await createNotes({
        title: titleValue,
        content: contentValue,
        time: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
        id: new Date().toLocaleString(),
      } as INotes)
      setTitleValue("")
      setContentValue("")
      setInputTitleValue("")
      setInputContentValue("")
    } else if (titleValue.trim().length && !contentValue.trim().length) {
      setInputContentValue("Enter the content")
      setInputTitleValue("")
    } else if (!titleValue.trim().length && contentValue.trim().length) {
      setInputTitleValue("Enter the title")
      setInputContentValue("")
    } else {
      setInputTitleValue("Enter the title")
      setInputContentValue("Enter the content")
    }
  }

  const closeNotes = (note: INotes) => {
    deleteNotes(note)
  }

  const updateNoteses = (note: INotes) => {
    updateNotes(note)
  }

  return (
    <div className="app">
      <h2>Block Note!</h2>

      <div>
        <div className="inp-cont">
          <label htmlFor="title-inp">Title:</label>
          <input type="text" id="title-inp" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
          <p className="inputValue">{inputTitleValue}</p>
          <br />
          <label htmlFor="content-inp">Content:</label>
          <input type="text" id="content-inp" value={contentValue} onChange={(e) => setContentValue(e.target.value)} />
          <p className="inputValue">{inputContentValue}</p>
        </div>
        <button className="cool-button" onClick={() => addAction()}>
          Add notes
        </button>
      </div>

      <div>
        {isLoading && (
          <div className="container">
            <span className="loader"></span>
          </div>
        )}
        {error && (
          <div className="container">
            <h3 className="error-heading">Error: The notes data has not been uploaded.</h3>
          </div>
        )}
        {notes && notes.map((note) => <NotesItem key={note.id} notes={note} close={closeNotes} update={updateNoteses} />)}
        {notes && notes.length === 0 && (
          <div className="container">
            <h2>No notes found 👀</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesBlock
