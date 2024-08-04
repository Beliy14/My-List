import React, { useRef } from "react"
import "./musicModal.css"
import theClose from "../../../assets/close.png"
import { useAppDispatch } from "../../../hooks/hook"
import { addMusicParams } from "../../../store/slices/musicSlice"
import { API } from "../../../services/service"
import { IMusic } from "../../../models/IMusic"

interface ModalProps {
  setTheModal: (e: boolean) => void
  mp3Url: string
  id: string
  updateAudioInstance: (mp3Url: string, newAudioInstance: HTMLAudioElement) => void
}

const MusicModal: React.FC<ModalProps> = ({ setTheModal, mp3Url, id, updateAudioInstance }) => {
  const dispatch = useAppDispatch()
  const [updateMusic] = API.useUpdateMp3MusicMutation()

  const imageRef = useRef<HTMLInputElement | null>(null)
  const titleRef = useRef<HTMLInputElement | null>(null)
  const bandRef = useRef<HTMLInputElement | null>(null)
  const yearRef = useRef<HTMLInputElement | null>(null)

  const saveParams = () => {
    const title = titleRef.current?.value
    const imageFile = imageRef.current?.files?.[0]
    const band = bandRef.current?.value
    const year = yearRef.current?.value

    if (title && imageFile && band && year) {
      if (!imageFile) {
        alert("Please select an image file.")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string
        setTheModal(false)
        dispatch(
          addMusicParams({
            title: title,
            image: imageDataUrl,
            band: band,
            year: year,
            mp3Url: mp3Url,
          })
        )
        updateMusic({
          title,
          image: imageDataUrl,
          band,
          year,
          id,
        } as IMusic)

        const newAudioInstance = new Audio(mp3Url)
        updateAudioInstance(mp3Url, newAudioInstance)
      }
      reader.readAsDataURL(imageFile)
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <div className="modal">
      <div className="blur" onClick={() => setTheModal(false)} />
      <div className="modal__container">
        <img onClick={() => setTheModal(false)} className="close-modal" src={theClose} />
        <h3>Add a cover!</h3>

        <form className="styled-form">
          <label className="form-label">Image: </label>
          <input className="file-input" type="file" accept="image/*" ref={imageRef} />

          <label className="form-label" htmlFor="title">
            Title:{" "}
          </label>
          <input className="text-input" id="title" type="text" ref={titleRef} />

          <label className="form-label" htmlFor="band">
            Band:{" "}
          </label>
          <input className="text-input" id="band" type="text" ref={bandRef} />

          <label className="form-label" htmlFor="year">
            Year:{" "}
          </label>
          <input className="text-input" id="year" type="text" ref={yearRef} />
        </form>

        <div className="btn-cont">
          <button onClick={saveParams}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default MusicModal