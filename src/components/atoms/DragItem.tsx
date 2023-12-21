import classNames from 'classnames'
import { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  text: string
}

export const DragItem = (props: IProps) => {
  const { text, className } = props

  return (
    <div
      draggable
      className={classNames(
        'relative pl-[20px] pr-2 box-border bg-melrose-100 cursor-move text-melrose-950 break-all',
        'flex justify-center items-center',
        'border rounded border-l-4 border-l-melrose-600',
        "before:absolute before:left-[4px] before:top-1/2 before:-translate-y-1/2 before:content-[''] before:bg-dots before:bg-no-repeat before:w-[8px] before:h-[12px] before:block",
        className
      )}
      onDragOver={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
      onDragLeave={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', text)
        ;(e.target as Element).classList.add('opacity-50')
      }}
      onDragEnd={(e) => {
        e.preventDefault()
        ;(e.target as Element).classList.remove('opacity-50')
      }}
    >
      {text}
    </div>
  )
}
