import classNames from "classnames"
import { NavLink, useNavigate } from "react-router-dom"
import { routes } from "../../data/routes"
import { useCallback } from "react"
import { useAppDispatch } from "../../redux/hooks"
import Cookies from "js-cookie"
import { setIsAuth } from "../../redux/authSlice"
import { userAPI } from "../../redux/services/userAPI"
import { wordsAPI } from "../../redux/services/wordsAPI"
import { testAPI } from "../../redux/services/testAPI"

const navItems = [
  { title: 'List', to: routes.home },
  { title: 'Test', to: routes.test },
  { title: 'Results', to: routes.results },
]

export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logout = useCallback(() => {
    Cookies.remove('token')
    
    dispatch(setIsAuth(false))
    dispatch(userAPI.util.resetApiState())
    dispatch(wordsAPI.util.resetApiState())
    dispatch(testAPI.util.resetApiState())

    navigate(routes.signIn)
  }, [dispatch, navigate])

  return (
    <div className="py-2 px-4 bg-melrose-300 border-b border-melrose-400 drop-shadow-md flex justify-between text-melrose-800 font-kalam text-lg">
      <div className="flex gap-1 sm:gap-6">
        {navItems.map(item => (
          <NavLink
            to={item.to}
            key={item.title}
            className={({ isActive }) => classNames(
              'px-2 py-1 focus:outline-melrose-500',
              { 'border border-melrose-50 rounded text-melrose-50': isActive },
              `${isActive ? 'hover:bg-melrose-400' : 'hover:text-melrose-50'}`
            )}
          >
            {item.title}
          </NavLink>
        ))}
      </div>

      <button
        onClick={logout}
        className="underline focus:outline-melrose-500 hover:text-melrose-50"
      >
        Sign out
      </button>
    </div>
  )
}
