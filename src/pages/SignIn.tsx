import { Link, useNavigate } from "react-router-dom"
import { routes } from "../data/routes"
import { LineInput, Loader, MainButton } from "../components"
import { useCallback, useEffect, useState } from "react"
import { ICredentials } from "../data/types"
import { useLoginMutation } from "../redux/services/userAPI"
import Cookies from "js-cookie"
import { useAppDispatch } from "../redux/hooks"
import { setIsAuth } from "../redux/authSlice"
import { signInValidation } from "../utils/signInValidation"

export const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isSuccess, data, isLoading }] = useLoginMutation()
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<ICredentials | undefined>()

  const handleInput = useCallback((value: string, key: keyof ICredentials) => {
    setCredentials(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  const handleSignIn = useCallback(async () => {
    const isValid = signInValidation(credentials, setErrors)

    if (!isValid) {
      return
    }

    await login(credentials).unwrap()
  }, [credentials, login])

  const handleOnClickDemo = useCallback(async () => {
    await login({
      email: 'demo@email.com',
      password: 'demo-password'
    })
  }, [login])

  useEffect(() => {
    if (isSuccess && data?.token) {
      Cookies.set('token', data.token)
      dispatch(setIsAuth(true))
      navigate(routes.home, { replace: true })
    }
  }, [data?.token, isSuccess, navigate, dispatch])

  return (
    <div>
      {isLoading && <Loader />}

      <form
        className="p-6 flex gap-8 flex-col items-center bg-melrose-50 rounded-lg shadow-lg"
        onSubmit={e => {
          e.preventDefault()
          handleSignIn()
        }}
      >
        <LineInput
          value={credentials.email}
          placeholder='email'
          handleInput={(value) => handleInput(value, 'email')}
          error={errors?.email}
        />

        <LineInput
          value={credentials.password}
          placeholder='password'
          isPassword
          handleInput={(value) => handleInput(value, 'password')}
          error={errors?.password}
        />

        <div className='text-sm self-start text-melrose-600'>
          <span>* Want to try the demo?{' '}</span>
          <span
            className='cursor-pointer hover:text-amber-500'
            onClick={handleOnClickDemo}
          >
              Just click here 🪄
          </span>
        </div>

        <MainButton
          type="submit"
          title="Sign in"
          optionalClass="w-24"
          onClick={handleSignIn}
          disabled={isLoading}
        />
      </form>

      <div className="pt-8 text-center text-melrose-800">
        <span>If you're new here, simply click{' '}</span>

        <Link
          to={routes.signUp}
          className="cursor-pointer hover:text-amber-500 underline font-bol focus:outline-melrose-800"
        >
          Register now
        </Link>

        <span>{' '}to join your language adventure</span>
      </div>
    </div>
  )
}
