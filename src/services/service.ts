import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { INews } from '../models/INews'
import { IMusic } from '../models/IMusic'

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({

      //news
      
      fetchAllNews: builder.query<INews[], string>({
        query: () => ({
            url: `/news`,
        }),
        providesTags: result => ['Post']
      }),

      createNews: builder.mutation<INews, INews>({
        query: (news) => ({
            url: `/news`,
            method: 'POST',
            body: news,
        }),
        invalidatesTags: ['Post']
      }),

      deleteNews: builder.mutation<INews, INews>({
        query: (news) => ({
          url: `/news/${news.id}`,
          method: 'DELETE',
          body: news,
        }),
        invalidatesTags: ['Post']
      }),

      updateNews: builder.mutation<INews, INews>({
        query: (news) => ({
            url: `/news/${news.id}`,
            method: 'PUT',
            body: news,
        }),
        invalidatesTags: ['Post']
      }),


      // musics

      fetchAllMusics: builder.query({
        query: () => '/musics',
        providesTags: (result) => ['Post'],
      }),
  
      addMp3Music: builder.mutation<IMusic, IMusic>({
        query: (music) => ({
            url: `/musics`,
            method: 'POST',
            body: music,
        }),
        invalidatesTags: ['Post']
      }),

      deleteMp3Music: builder.mutation<IMusic, IMusic>({
        query: (music) => ({
          url: `/musics/${music.id}`,
          method: 'DELETE',
          body: music,
        }),
        invalidatesTags: ['Post']
      }),


    }),
  })