import { AxiosError, AxiosResponse } from 'axios'
import { serverErrors } from '../data/errors'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const responseHandler = async <T>(
  response: Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  return await response
    .then((response) => response)
    .catch((error: AxiosError<{ message: string }>) => {
      const message = error.response?.data
        ? error.response.data.message
        : error.message

      toast.error(message)
      console.debug(error)

      if (
        message === serverErrors.expired ||
        message === serverErrors.invalidToken
      ) {
        Cookies.remove('token')
        setTimeout(() => window.history.go(), 4000)
      }

      return Promise.reject(new Error(message))
    })
}
