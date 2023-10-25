import { useEffect } from "react"

export const Loader = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center gap-8 z-20">
      <div className="w-4 h-4 rounded-full bg-melrose-800 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-melrose-800 animate-bounce-1"></div>
      <div className="w-4 h-4 rounded-full bg-melrose-800 animate-bounce-2"></div>
    </div>
  )
}
