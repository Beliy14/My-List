import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusic } from "../../models/IMusic";

interface newsState {
    musics: IMusic[],
}

const initialState: newsState = {
    musics: [],
}


export const musicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {
        addMusics(state, action: PayloadAction<{title: string, mp3Url: string, /* image: string, band: string, year: string */}>) {
            state.musics.push({
                id: new Date().toLocaleString(),
                title: action.payload.title,
                mp3Url: action.payload.title,
                // image: action.payload.image,
                // band: action.payload.band,
                // year: action.payload.year
            })
        }
    },

})


export const {addMusics} = musicsSlice.actions
export default musicsSlice.reducer