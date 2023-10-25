import { Outlet } from 'react-router-dom'

export const WelcomeLayout = () => {
  return (
    <div className="mx-4 sm:mx-8 flex flex-col items-center justify-center">
      <div className="py-8 sm:py-16 text-melrose-900 drop-shadow-3d text-center leading-10">
        <p className="inline text-3xl italic">Let's become better with </p>
        <h1 className="inline text-5xl font-kalam">Your Dictionary!</h1>
      </div>

      <Outlet />
    </div>
  )
}
