import React, { useEffect, useRef, useState } from "react"
import "../notes/notesBlock.css"
import "./music.css"
import { API } from "../../services/service"
import { IMusic } from "../../models/IMusic"
import { useAppDispatch } from "../../hooks/hook"
import { addMusics } from "../../store/slices/musicSlice"
import plusImage from "../../assets/plus.png"
import MusicModal from "./component/MusicModal"
import { useLocation } from "react-router-dom"

const Music: React.FC = () => {
  const { data: musics, isLoading, error } = API.useFetchAllMusicsQuery("")
  const [addMusic] = API.useAddMp3MusicMutation()
  const [deleteMusic] = API.useDeleteMp3MusicMutation()

  const dispatch = useAppDispatch()

  const location = useLocation()

  const [audioIsLoading, setAudioIsLoading] = useState(false)
  const [noAudioUploaded, setNoAudioUploaded] = useState(false)

  const [theModal, setTheModal] = useState(false)

  const [audioInstances, setAudioInstances] = useState<{
    [key: string]: HTMLAudioElement
  }>({})

  const inputMusicRef = useRef<HTMLInputElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  const [fileName, setFileName] = useState("")
  const [filteredMusics, setFilteredMusics] = useState<IMusic[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("")
    }
  }

  useEffect(() => {
    return () => {
        musics?.forEach((el: IMusic) => {
          stopAllSounds(el.mp3Url)
        })
    }
  }, [musics])

  const searchHandleClick = () => {
    const element = searchRef.current?.value
    if (element) {
      const filtered = musics?.filter((mus: IMusic) => {
        const titleMatch = mus.title && mus.title.toLowerCase().includes(element.toLowerCase())
        const bandMatch = mus.band && mus.band.toLowerCase().includes(element.toLowerCase())
        const yearMatch = mus.year && mus.year.toString().includes(element)
        return titleMatch || bandMatch || yearMatch
      })
      setFilteredMusics(filtered || [])
    } else {
      setFilteredMusics(musics || [])
    }
  }

  const stopAllSounds = (exceptMp3Url: string) => {
    Object.keys(audioInstances).forEach((mp3Url) => {
      if (mp3Url !== exceptMp3Url && !audioInstances[mp3Url].paused) {
        audioInstances[mp3Url].pause()
      }
    })
  }

  const updateAudioInstance = (mp3Url: string, newAudioInstance: HTMLAudioElement) => {
    setAudioInstances((prev) => ({ ...prev, [mp3Url]: newAudioInstance }))
  }

  const playSound = (mp3Url: string) => {
    stopAllSounds(mp3Url)
    if (audioInstances[mp3Url]) {
      audioInstances[mp3Url].play()
    }
  }

  const pauseSound = (mp3Url: string) => {
    if (audioInstances[mp3Url]) {
      audioInstances[mp3Url].pause()
    }
  }

  const renderSound = (mp3Url: string) => {
    if (audioInstances[mp3Url]) {
      audioInstances[mp3Url].currentTime = 0
    }
  }

  const uploadMusic = (e: React.FormEvent) => {
    e.preventDefault()
    const file = inputMusicRef.current?.files?.[0]
    if (!file) {
      setNoAudioUploaded(true)
    }
    if (file) {
      setFileName("")
      const fileName = file.name
      const isFileExists = musics?.some((music: IMusic) => music.title === fileName)
      if (isFileExists && inputMusicRef.current) {
        setAudioIsLoading(true)
        inputMusicRef.current.value = ""
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const mp3Url = e.target?.result as string
        const newAudioInstance = new Audio(mp3Url)
        setAudioInstances((prev) => ({ ...prev, [mp3Url]: newAudioInstance }))
        dispatch(addMusics({ title: fileName, mp3Url, image: "", band: "", year: "" }))
        addMusic({
          title: fileName,
          mp3Url,
          id: new Date().toLocaleString(),
          image: "",
          band: "",
          year: "",
        } as IMusic)

        if (inputMusicRef.current) {
          inputMusicRef.current.value = ""
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const deleteThisMusic = (event: React.MouseEvent, music: IMusic) => {
    event.stopPropagation()
    const mp3Url = music.mp3Url
    if (mp3Url) {
      localStorage.removeItem(mp3Url)
    }
    deleteMusic(music)
  }

  window.addEventListener("click", () => {
    setAudioIsLoading(false)
    setNoAudioUploaded(false)
  })

  useEffect(() => {
    setFilteredMusics(musics || [])
  }, [musics])

  return (
    <>
      <div className="search-container">
        <div className="search-music-container">
          <input type="text" placeholder="Search by title" onChange={searchHandleClick} ref={searchRef} />
        </div>
      </div>

      <div className="search-container">
        <form className="upload-container" onSubmit={uploadMusic}>
          <input type="file" accept="audio/*" id="fileInput" ref={inputMusicRef} onChange={handleFileChange} style={{ display: "none" }} />
          <label htmlFor="fileInput" className="file-upload-label">
            {fileName ? `Selected file: ${fileName}` : "Select a file"}
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>

      {audioIsLoading && (
        <div className="container">
          <h3 className="warning">This audio has already been uploaded.</h3>
        </div>
      )}

      {noAudioUploaded && (
        <div className="container">
          <h3 className="warning">Insert the audio file!</h3>
        </div>
      )}

      <div className="music-container">
        {isLoading && (
          <div className="container">
            <span className="loader"></span>
          </div>
        )}
        {error && (
          <div className="container">
            <h3 className="error-heading">Error: The music data has not been uploaded.</h3>
          </div>
        )}

        {filteredMusics.map((music: IMusic) => {
          const mp3Url = music.mp3Url
          return (
            <div key={music.id} className="music">
              <img style={{ border: "1px solid #7e7e7e" }} alt="Add" src={music.image || plusImage} className="icon-music" onClick={() => setTheModal(true)} />

              <div className="body-music">
                <div>
                  <div className="title-music">{music.title}</div>
                  <div className="band-music">{music.band}</div>
                  <div className="year-music">{music.year}</div>
                </div>

                {theModal && <MusicModal setTheModal={setTheModal} mp3Url={mp3Url} id={music.id} updateAudioInstance={updateAudioInstance} />}

                <div className="btn-block">
                  <button className="btn-play" onClick={() => playSound(mp3Url)}>
                    Play
                  </button>
                  <button className="btn-stop" onClick={() => pauseSound(mp3Url)}>
                    Stop
                  </button>
                  <button className="btn-render" onClick={() => renderSound(mp3Url)}>
                    Render
                  </button>
                  <button className="btn-delete" onClick={(e) => deleteThisMusic(e, music)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filteredMusics.length === 0 && (
          <div className="container">
            <h2>No music found 👀</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default Music

/* 
  сохранять аудиофайлы
  
    const saveAudioState = async (mp3Url: string, currentTime: number) => {
    try {
      await fetch('http://localhost:5000/audioStates', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [mp3Url]: currentTime })
      });
    } catch (error) {
      console.error('Failed to save audio state:', error);
    }
  };

  const loadAudioState = async (mp3Url: string) => {
    try {
      const response = await fetch(`http://localhost:3000/audioStates/${mp3Url}`);
      const data = await response.json();
      return data ? data.currentTime : 0;
    } catch (error) {
      console.error('Failed to load audio state:', error);
      return 0;
    }
  };

  useEffect(() => {
    const initializeAudioInstances = async () => {
      if (!musics || !Array.isArray(musics)) return;

      const newAudioInstances: Record<string, HTMLAudioElement> = {};
      for (const music of musics) {
        const mp3Url = music.mp3Url;
        const currentTime = await loadAudioState(mp3Url);
        const newAudioInstance = new Audio(mp3Url);
        newAudioInstance.currentTime = currentTime;
        newAudioInstances[mp3Url] = newAudioInstance;
      }
      setAudioInstances(newAudioInstances);
    };

    initializeAudioInstances();
  }, [musics]);

  const playSound = (mp3Url: string) => {
    stopAllSounds(mp3Url)
    if (audioInstances[mp3Url]) {
      audioInstances[mp3Url].play()
      saveAudioState(mp3Url, audioInstances[mp3Url].currentTime);
    }
  }

*/
