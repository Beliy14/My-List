import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { INotes } from "../models/INotes"
import { IMusic } from "../models/IMusic"

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    
    //notes
    fetchAllNotes: builder.query<INotes[], string>({
      query: () => ({
        url: `/notes`,
      }),
      providesTags: (result) => ["Post"],
    }),

    createNotes: builder.mutation<INotes, INotes>({
      query: (notes) => ({
        url: `/notes`,
        method: "POST",
        body: notes,
      }),
      invalidatesTags: ["Post"],
    }),

    deleteNotes: builder.mutation<INotes, INotes>({
      query: (notes) => ({
        url: `/notes/${notes.id}`,
        method: "DELETE",
        body: notes,
      }),
      invalidatesTags: ["Post"],
    }),

    updateNotes: builder.mutation<INotes, INotes>({
      query: (notes) => ({
        url: `/notes/${notes.id}`,
        method: "PUT",
        body: notes,
      }), 
      invalidatesTags: ["Post"],
    }),


    // musics
    fetchAllMusics: builder.query({
      query: () => "/musics",
      providesTags: (result) => ["Post"],
    }),

    addMp3Music: builder.mutation<IMusic, IMusic>({
      query: (music) => ({
        url: `/musics`,
        method: "POST",
        body: music,
      }),
      invalidatesTags: ["Post"],
    }),

    deleteMp3Music: builder.mutation<IMusic, IMusic>({
      query: (music) => ({
        url: `/musics/${music.id}`,
        method: "DELETE",
        body: music,
      }),
      invalidatesTags: ["Post"],
    }),

    updateMp3Music: builder.mutation<IMusic, IMusic>({
      query: (music) => ({
        url: `/musics/${music.id}`,
        method: "PUT",
        body: music,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
})
