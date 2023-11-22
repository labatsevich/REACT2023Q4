import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnime, IAnimeResponse } from '../../types';
import { HYDRATE } from 'next-redux-wrapper'

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    animeList: builder.query({
      query: (params: { q?: string; limit?: number; page?: number }) => ({
        url: 'anime',
        params,
      }),
      transformResponse: (response: IAnimeResponse) => response,
    }),
    getDetails: builder.query<IAnime, number>({
      query: (id) => `anime/${id}`,
      transformResponse: (response: { data: IAnime }) => response.data,
    }),
  }),
});

export const { useAnimeListQuery, useGetDetailsQuery } = animeApi;
export const { animeList, getDetails } = animeApi.endpoints;