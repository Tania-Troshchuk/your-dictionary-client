import { responseHandler } from '../responseHandler'
import { clientWithToken } from '../axiosClients'
import { ITextToSpeech } from '../../types/types'
import { AxiosResponse } from 'axios'

export const getSpeech = async (data: ITextToSpeech): Promise<Blob> => {
  const response: AxiosResponse<Blob> = await responseHandler(
    clientWithToken.post('api/text-to-speech', data, { responseType: 'blob' })
  )

  return response.data
}
