import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TCredentials, IUser } from '../../types/types'
import { responseHandler } from '../responseHandler'
import { clientNoToken } from '../axiosClients'

export const userAPI = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registration: builder.mutation<{ token: string }, IUser>({
      queryFn: async (data: IUser) => {
        return await responseHandler(
          clientNoToken.post('api/registration', data)
        )
      },
    }),

    login: builder.mutation<{ token: string }, TCredentials>({
      queryFn: async (data: TCredentials) => {
        return await responseHandler(clientNoToken.post('api/login', data))
      },
    }),
  }),
})

export const { useRegistrationMutation, useLoginMutation } = userAPI
