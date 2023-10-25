export interface ITest {
  _id?: string
  passingDate?: string
  result: number
  wrongWords: string[]
}

export interface IUser {
  username: string
  email: string
  password: string
}

export type ICredentials = Pick<IUser, 'email' | 'password'>

export interface IWord {
  _id?: string
  word: string
  translation: string
  examples?: string
}

export interface ITextToSpeech {
  text: string
}
