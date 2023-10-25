import { ICredentials } from '../data/types'

export const signInValidation = (
  credentials: ICredentials,
  setErrors: React.Dispatch<React.SetStateAction<ICredentials | undefined>>
): boolean | undefined => {
  const emailRegExp = /^[^@]*@[^@.]+\.[a-z]+$/i
  const errors: ICredentials = {
    email: '',
    password: '',
  }

  if (!credentials.email || !emailRegExp.test(credentials.email)) {
    errors.email = 'Invalid email format. Please check the email.'
  }

  if (credentials.password.length < 8) {
    errors.password = 'The password should be at least 8 characters'
  }

  if (errors.email || errors.password) {
    setErrors(errors)
    return false
  }

  setErrors(errors)
  return true
}
