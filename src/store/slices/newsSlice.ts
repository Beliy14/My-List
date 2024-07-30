import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INews } from "../../models/INews";

interface newsState {
    news: INews[],

}

const initialState: newsState = {
    news: [],
}


export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addNews(state, action: PayloadAction<{title: string, content: string}>) {
            state.news.push({
                id: new Date().toLocaleString(),
                title: action.payload.title,
                content: action.payload.content,
                time: new Date().toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'}),
                status: ''
            })
        }
    },

})


export const {addNews} = newsSlice.actions
export default newsSlice.reducer