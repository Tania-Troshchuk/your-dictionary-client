import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICredentials, IUser } from '../../data/types'
import { responseHandler } from '../../services/responseHandler'
import { clientNoToken } from '../../services/axiosClients'

export const userAPI = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registration: builder.mutation<{ token: string }, IUser>({
      queryFn: async (data: IUser) => {
        return responseHandler(clientNoToken.post('api/registration', data))
      },
    }),

    login: builder.mutation<{ token: string }, ICredentials>({
      queryFn: async (data: ICredentials) => {
        return responseHandler(clientNoToken.post('api/login', data))
      },
    }),
  }),
})

export const { useRegistrationMutation, useLoginMutation } = userAPI
