import { ISignUpUser } from "../pages"

export const signUpValidation = (
  user: ISignUpUser,
  setErrors: React.Dispatch<React.SetStateAction<ISignUpUser | undefined>>
): boolean | undefined => {
  const emailRegExp = /^[^@]*@[^@.]+\.[a-z]+$/i
  const errors: ISignUpUser = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  if (user.username.length > 50) {
    errors.username = "Username must be less than 50 characters"
  }

  if (user.username.length < 2) {
    errors.username = "Username must be at least 2 characters"
  }

  if (!user.email || !(emailRegExp.test(user.email))) {
    errors.email = "Invalid email format. Please check the email."
  }

  if (user.password.length < 8) {
    errors.password = "The password should be at least 8 characters"
  }

  if (user.password !== user.repeatPassword) {
    errors.repeatPassword = "Passwords do not match. Please make sure your passwords match."
  }

  if (Object.values(errors).some(error => error)) {
    setErrors(errors)
    return false
  }

  setErrors(errors)
  return true
}