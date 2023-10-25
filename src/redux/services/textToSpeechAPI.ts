// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { responseHandler } from "../../services/responseHandler";
import { clientWithToken } from "../../services/axiosClients";
import { ITextToSpeech } from "../../data/types";
import { AxiosResponse } from "axios";

export const getSpeech = async (data: ITextToSpeech): Promise<Blob> => {
  const response: AxiosResponse<Blob> = await responseHandler(clientWithToken.post(
    'api/text-to-speech',
    data,
    { responseType: 'blob' })
  )

  return response.data
}

// export const textToSpeechAPI = createApi({
//   reducerPath: 'api/text-to-speech',
//   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
//   tagTypes: ['Text-to-speech'],
//   endpoints: (builder) => ({
//     getSpeech: builder.mutation<Blob, ITextToSpeech>({
//       queryFn: async (data: ITextToSpeech) => {
//         return await responseHandler(clientWithToken.post(
//           'api/text-to-speech',
//           data,
//           { responseType: 'blob' })
//         )
//       }
//     })
//   }),
// })

// export const { useGetSpeechMutation } = textToSpeechAPI