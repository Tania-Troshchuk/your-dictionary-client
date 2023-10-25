import { HTMLAttributes, useEffect } from "react"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void
}

export const ModalBox = (props: IProps) => {
  const { onClose, children } = props

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div
      onClick={onClose}
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full mx-4 md:w-8/12 md:mx-auto"
      >
        {children}
      </div>
    </div>
  )
}
