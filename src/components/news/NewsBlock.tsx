import React, { useState } from "react"
import { useAppDispatch } from "../../hooks/hook"
import { addNews } from "../../store/slices/newsSlice"
import "./newsBlock.css"
import { API } from "../../services/service"
import NewsItem from "./NewsItem"
import { INews } from "../../models/INews"

const NewsBlock: React.FC = () => {
  const { data: news, isLoading, error } = API.useFetchAllNewsQuery('')
  const [createNews, {}] = API.useCreateNewsMutation()
  const [deleteNews, {}] = API.useDeleteNewsMutation()
  const [updateNewsas] = API.useUpdateNewsMutation()

  const dispatch = useAppDispatch()

  const [titleValue, setTitleValue] = useState("")
  const [contentValue, setContentValue] = useState("")
  const [inputTitleValue, setInputTitleValue] = useState("")
  const [inputContentValue, setInputContentValue] = useState("")

  const addAction = async () => {
    if (titleValue.trim().length && contentValue.trim().length) {
      dispatch(addNews({ title: titleValue, content: contentValue }))
      await createNews({
        title: titleValue,
        content: contentValue,
        time: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
        id: new Date().toLocaleString(),
      } as INews)
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

  const closeNews = (newas: INews) => {
    deleteNews(newas)
  }

  const updateNews = (newas: INews) => {
    updateNewsas(newas)
  }

  return (
    <div className="app">
      <h2>News Block!</h2>

      <div>
        <div className="inp-cont">
          <label htmlFor="title-inp">Title:</label>
          <input
            type="text"
            id="title-inp"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <p className="inputValue">{inputTitleValue}</p>
          <br />
          <label htmlFor="content-inp">Content:</label>
          <input
            type="text"
            id="content-inp"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          />
          <p className="inputValue">{inputContentValue}</p>
        </div>
        <button className="cool-button" onClick={() => addAction()}>
          Add news
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
            <h3 className="error-heading">
              Error: The news data has not been uploaded.
            </h3>
          </div>
        )}
        {news &&
          news.map((news) => (
            <NewsItem
              key={news.id}
              news={news}
              close={closeNews}
              update={updateNews}
            />
          ))}
        {news && news.length === 0 && (
          <div className="container">
            <h2 className="">No news found 👀</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsBlock
