import { configureStore } from "@reduxjs/toolkit"
import newsReducer from "./slices/newsSlice"
import musicReducer from "./slices/musicSlice"
import { API } from "../services/service"

export const store = configureStore({
  reducer: {
    news: newsReducer,
    musics: musicReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
