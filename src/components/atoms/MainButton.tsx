import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  optionalClass?: string
}

export const MainButton = (props: IProps) => {
  const { title, optionalClass, onClick, ...rest } = props

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick(e)
      }}
      className={classNames(
        'p-2 bg-melrose-500 border rounded-lg text-melrose-50 focus:outline-melrose-800',
        'hover:bg-melrose-600 hover:text-white',
        'disabled:bg-melrose-400 disabled:text-melrose-50',
        optionalClass
      )}
      {...rest}
    >
      {title}
    </button>
  )
}
