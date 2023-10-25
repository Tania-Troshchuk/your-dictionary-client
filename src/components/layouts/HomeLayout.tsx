import { Outlet } from "react-router-dom"
import { NavBar } from "../index"

export const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <Outlet />
    </div>
  )
}
