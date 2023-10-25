import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './data/routes'
import { HomeLayout, WelcomeLayout } from './components'
import { Home, NotFound, Results, SignIn, SignUp, Test } from './pages'
import { useAppSelector } from './redux/hooks'

function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)

  return (
    <div>
      {isAuth ? (
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path={routes.test} element={<Test />} />
            <Route path={routes.results} element={<Results />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<WelcomeLayout />}>
            <Route path={routes.signIn} element={<SignIn />} />
            <Route path={routes.signUp} element={<SignUp />} />
          </Route>

          <Route path="*" element={<Navigate to={routes.signIn} />} />
        </Routes>
      )}
    </div>
  )
}

export default App
