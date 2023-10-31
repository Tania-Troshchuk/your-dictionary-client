import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { responseHandler } from '../responseHandler'
import { IWord } from '../../data/types'
import { clientWithToken } from '../axiosClients'

export const wordsAPI = createApi({
  reducerPath: 'api/words',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Words'],
  endpoints: (builder) => ({
    getWords: builder.query<IWord[], void>({
      queryFn: async () => {
        return await responseHandler(clientWithToken.get('api/words'))
      },
      providesTags: ['Words'],
    }),
    addWord: builder.mutation<IWord, IWord>({
      queryFn: async (data: IWord) => {
        return await responseHandler(clientWithToken.post('api/words', data))
      },
      invalidatesTags: ['Words'],
    }),
    updateWord: builder.mutation<IWord, Partial<IWord> & Pick<IWord, '_id'>>({
      queryFn: async ({ _id, ...data }) => {
        return await responseHandler(
          clientWithToken.put(`api/words/${_id}`, data)
        )
      },
      invalidatesTags: ['Words'],
    }),
    deleteWord: builder.mutation<IWord, string>({
      queryFn: async (_id) => {
        return await responseHandler(clientWithToken.delete(`api/words/${_id}`))
      },
      invalidatesTags: ['Words'],
    }),
  }),
})

export const {
  useGetWordsQuery,
  useAddWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
} = wordsAPI
