import React from "react"
import NewsBlock from "./components/news/NewsBlock"
import "./app.css"
import Navbar from "./components/navbar/Navbar"
import Main from "./components/main/Main"
import { Routes, Route } from "react-router-dom"
import Music from "./components/music/Music"

function App() {
  return (
    <>
      <Navbar />

        <Routes>
          <Route  path="/" element={<Main />} />
          <Route  path="/news" element={<NewsBlock />} />
          <Route  path="/music" element={<Music />} />
        </Routes>

    </>
  )
}

export default App
