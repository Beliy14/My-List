import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusic } from "../../models/IMusic";

interface MusicState {
    musics: IMusic[];
}

const initialState: MusicState = {
    musics: [],
};

export const musicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {
        addMusics(state, action: PayloadAction<{ title: string, mp3Url: string, image: string, band: string, year: string }>) {
            state.musics.push({
                id: new Date().toLocaleString(),
                title: action.payload.title,
                mp3Url: action.payload.mp3Url,
                image: action.payload.image,
                band: action.payload.band,
                year: action.payload.year,
            });
        },

        addMusicParams(state, action: PayloadAction<{ title: string, image: string, band: string, year: string, mp3Url: string }>) {
            const musicIndex = state.musics.findIndex(music => music.mp3Url === action.payload.mp3Url);
            if (musicIndex !== -1) {
                state.musics[musicIndex] = {
                    ...state.musics[musicIndex],
                    title: action.payload.title,
                    image: action.payload.image,
                    band: action.payload.band,
                    year: action.payload.year,
                };
            }
        },
    },
});

export const { addMusics, addMusicParams } = musicsSlice.actions;
export default musicsSlice.reducer;