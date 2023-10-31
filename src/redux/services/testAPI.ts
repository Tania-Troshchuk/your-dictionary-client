import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITest } from '../../types/types'
import { responseHandler } from '../responseHandler'
import { clientWithToken } from '../axiosClients'

export const testAPI = createApi({
  reducerPath: 'api/tests',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Tests'],
  endpoints: (builder) => ({
    getTests: builder.query<Required<ITest>[], void>({
      queryFn: async () => {
        return await responseHandler(clientWithToken.get('api/tests'))
      },
      providesTags: ['Tests'],
    }),
    addTest: builder.mutation<ITest[], ITest>({
      queryFn: async (data: ITest) => {
        return await responseHandler(clientWithToken.post('api/tests', data))
      },
      invalidatesTags: ['Tests'],
    }),
    deleteTest: builder.mutation<ITest, string>({
      queryFn: async (_id: string) => {
        return await responseHandler(clientWithToken.delete(`api/tests/${_id}`))
      },
      invalidatesTags: ['Tests'],
    }),
  }),
})

export const { useGetTestsQuery, useAddTestMutation, useDeleteTestMutation } =
  testAPI
