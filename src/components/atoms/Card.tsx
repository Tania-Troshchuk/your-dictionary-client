import classNames from 'classnames'
import { HTMLAttributes } from 'react'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}
export const Card = (props: IProps) => {
  const { title, description, className, ...rest } = props

  return (
    <section
      {...rest}
      className={classNames(
        'flex flex-col gap-8 p-6 max-w-md border bg-melrose-50 rounded-lg cursor-pointer box-border',
        'hover:border-melrose-300 hover:shadow-lg',
        className
      )}
    >
      <h3 className="text-xl font-semibold text-melrose-800">{title}</h3>

      <p className="text-lg text-melrose-900 text-justify">{description}</p>
    </section>
  )
}
