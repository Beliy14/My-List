import React from "react"
import NotesBlock from "./pages/notes/NotesBlock"
import "./app.css"
import Navbar from "./components/navbar/Navbar"
import Main from "./pages/main/Main"
import { Routes, Route } from "react-router-dom"
import Music from "./pages/music/Music"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notes" element={<NotesBlock />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </>
  )
}

export default App
