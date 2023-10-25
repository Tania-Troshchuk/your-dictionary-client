import { ITest, IUser, IWord } from "../data/types";
import { clientNoToken, clientWithToken } from "./axiosClients";
import { responseHandler } from "./responseHandler";

export const login = async (
  data: Pick<IUser, 'email' | 'password'>
): Promise<{ token: string }> => {
  return responseHandler(clientNoToken.post('/api/login', data))
}

export const registration = async (data: IUser): Promise<{ token: string }> => {
  return responseHandler(clientNoToken.post('/api/registration', data))
}

export const getWords = async (): Promise<IWord[]> => {
  return responseHandler(clientWithToken.get('/api/words'))
}

export const createWord = async (data: IWord): Promise<IWord> => {
  return responseHandler(clientWithToken.post('/api/words', data))
}

export const updateWord = async (data: IWord): Promise<IWord> => {
  return responseHandler(clientWithToken.put('/api/words', data))
}

export const deleteWord = async (id: string): Promise<IWord> => {
  return responseHandler(clientWithToken.delete(`/api/words${id}`))
}

export const getTests = async (): Promise<ITest[]> => {
  return responseHandler(clientWithToken.get('/api/tests'))
}

export const createTest = async (data: ITest): Promise<ITest> => {
  return responseHandler(clientWithToken.post('/api/tests', data))
}