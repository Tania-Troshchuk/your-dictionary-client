import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../data/routes'
import { LineInput, Loader, MainButton } from '../components'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { IUser } from '../data/types'
import { useRegistrationMutation } from '../redux/services/userAPI'
import { signUpValidation } from '../utils/signUpValidation'
import Cookies from 'js-cookie'
import { setIsAuth } from '../redux/authSlice'

export interface ISignUpUser extends IUser {
  repeatPassword: string
}

export const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [registration, { isSuccess, data, isLoading }] =
    useRegistrationMutation()
  const [user, setUser] = useState<ISignUpUser>({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [errors, setErrors] = useState<ISignUpUser | undefined>()

  const handleInput = useCallback((value: string, key: keyof ISignUpUser) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const handleSignUp = useCallback(async () => {
    const isValid = signUpValidation(user, setErrors)

    if (!isValid) {
      return
    }

    await registration({
      username: user.username,
      email: user.email,
      password: user.password,
    })
  }, [registration, user])

  useEffect(() => {
    if (isSuccess && data?.token) {
      Cookies.set('token', data.token)
      dispatch(setIsAuth(true))
      navigate(routes.home, { replace: true })
    }
  }, [data?.token, isSuccess, navigate, dispatch])

  return (
    <div className="w-full max-w-lg">
      {isLoading && <Loader />}

      <form
        className="p-6 flex gap-6 flex-col bg-melrose-50 rounded-lg shadow-lg"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignUp()
        }}
      >
        <Link
          to={routes.signIn}
          className="text-melrose-300 hover:text-melrose-600 cursor-pointer"
        >
          ← back to Sign in
        </Link>

        <LineInput
          value={user.username}
          handleInput={(value) => handleInput(value, 'username')}
          placeholder="username"
          error={errors?.username}
        />

        <LineInput
          value={user.email}
          handleInput={(value) => handleInput(value, 'email')}
          placeholder="email"
          error={errors?.email}
        />

        <LineInput
          value={user.password}
          handleInput={(value) => handleInput(value, 'password')}
          placeholder="password"
          isPassword
          error={errors?.password}
        />

        <LineInput
          value={user.repeatPassword}
          handleInput={(value) => handleInput(value, 'repeatPassword')}
          placeholder="repeat password"
          isPassword
          error={errors?.repeatPassword}
        />

        <MainButton
          type="submit"
          title="Register now"
          optionalClass="w-full"
          onClick={handleSignUp}
          disabled={isLoading}
        />
      </form>
    </div>
  )
}
