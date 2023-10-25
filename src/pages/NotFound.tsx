import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 h-screen tracking-wide">
      <p className="text-3xl text-melrose-950 drop-shadow-3d">404 | Page not found</p>

      <Link to="/" className="p-3 border-2 rounded border-melrose-50 cursor-pointer hover:border-melrose-400 hover:text-melrose-400 focus:outline-melrose-800 text-white">Return to home page</Link>
    </div>
  )
}
