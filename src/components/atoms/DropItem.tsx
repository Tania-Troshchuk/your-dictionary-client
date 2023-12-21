import classNames from 'classnames'
import { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  index: number
  handleDrop: (text: string, index: number) => void
}

export const DropItem = (props: IProps) => {
  const { index, handleDrop, className } = props

  return (
    <div
      className={classNames('border rounded', className)}
      onDragOver={(e) => {
        const target = e.target as Element

        if (target.textContent) {
          return
        }

        e.preventDefault()
        target.classList.add('bg-melrose-100')
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        ;(e.target as Element).classList.remove('bg-melrose-100')
      }}
      onDrop={(e) => {
        const target = e.target as Element

        if (target.textContent) return

        e.preventDefault()
        target.classList.remove('bg-melrose-100')
        target.classList.add('bg-melrose-300')

        const text = e.dataTransfer.getData('text/plain')

        handleDrop(text, index)
      }}
    />
  )
}
