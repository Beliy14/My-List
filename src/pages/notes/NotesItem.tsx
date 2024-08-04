import React, { useEffect } from "react"
import { INotes } from "../../models/INotes"
import "./notesBlock.css"
import penIcon from "../../assets/pen.png"
import closeIcon from "../../assets/close.png"

interface NotesItemProps {
  notes: INotes
  close: (news: INotes) => void
  update: (news: INotes) => void
}

const NotesItem: React.FC<NotesItemProps> = ({ notes, close, update }) => {
  const deleteNews = (event: React.MouseEvent) => {
    event.stopPropagation()
    close(notes)
  }

  const updateTitleNews = (event: React.MouseEvent) => {
    event.stopPropagation()
    const title = prompt("Update title:") || notes.title
    if (title !== notes.title) {
      const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
      const status = "Update"
      update({ ...notes, title, time, status })
    }
  }

  const updateContentNews = (event: React.MouseEvent) => {
    event.stopPropagation()
    const content = prompt("Update content:") || notes.content
    if (content !== notes.content) {
      const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
      const status = "Update"
      update({ ...notes, content, time, status })
    }
  }

  useEffect(() => {
    const penIcons = document.getElementsByClassName("pen-icon")
    Array.from(penIcons).forEach((icon) => {
      icon.addEventListener("click", () => {
        const parentElement = icon.parentElement
        if (parentElement) {
          const updateDiv = parentElement.querySelector(".update-div")
          if (updateDiv instanceof HTMLElement) {
            updateDiv.style.zIndex = "100"
            updateDiv.style.opacity = "1"
          }
        }
      })
    })

    const updateDivs = document.getElementsByClassName("update-div")
    Array.from(updateDivs).forEach((updateDiv) => {
      const spans = updateDiv.querySelectorAll("span")
      spans.forEach((span) => {
        span.addEventListener("click", () => {
          if (updateDiv instanceof HTMLElement) {
            updateDiv.style.zIndex = "-1"
            updateDiv.style.opacity = "0"
          }
        })
      })
    })

    // Cleanup function to remove event listeners
    return () => {
      Array.from(penIcons).forEach((icon) => {
        icon.removeEventListener("click", () => {
          const parentElement = icon.parentElement
          if (parentElement) {
            const updateDiv = parentElement.querySelector(".update-div")
            if (updateDiv instanceof HTMLElement) {
              updateDiv.style.zIndex = "100"
              updateDiv.style.opacity = "1"
            }
          }
        })
      })

      Array.from(updateDivs).forEach((updateDiv) => {
        const spans = updateDiv.querySelectorAll("span")
        spans.forEach((span) => {
          span.removeEventListener("click", () => {
            if (updateDiv instanceof HTMLElement) {
              updateDiv.style.zIndex = "-1"
              updateDiv.style.opacity = "0"
            }
          })
        })
      })
    }
  }, [])

  return (
    <div className="news-block">
      <img className="pen-icon" src={penIcon} alt="Update" />
      <img className="close-icon" src={closeIcon} alt="Close" onClick={deleteNews} />

      <span className="update-div">
        <span onClick={updateTitleNews}>Title </span> <hr />
        <span onClick={updateContentNews}> Content</span>
      </span>

      <p className="news-status">{notes.status}</p>
      <div>
        <h4>{notes.title}</h4>
        <span className="news-time">{notes.time}</span>
        <p className="news-content">{notes.content}</p>
      </div>
    </div>
  )
}

export default NotesItem
