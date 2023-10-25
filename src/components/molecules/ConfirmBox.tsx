import { HTMLAttributes } from "react"
import { MainButton } from ".."

interface IProps extends HTMLAttributes<HTMLDivElement> {
  item: string,
  text?: string,
  onClickYes: () => void,
  onClickNo: () => void,
  yes?: string,
  no?: string,
}

export const ConfirmBox = (props: IProps) => {
  const { item, text, yes = 'Yes', no = 'No', onClickYes, onClickNo } = props

  return (
    <div className="px-6 py-10 md:w-[600px] md:mx-auto flex flex-col gap-8 items-center justify-center bg-melrose-50 rounded-lg shadow-lg">
      <div className="tracking-wide text-2xl text-melrose-600 text-center font-kalam leading-10" >
        <span>{`Are you sure you want to delete the ${item} `}</span>
        {text && <span className="px-1 bg-melrose-200 rounded-md">{text}</span>}
        <span>?</span>
      </div>

      <div className="flex gap-4 w-full">
        <MainButton optionalClass="w-1/2" title={yes} onClick={onClickYes} />
        <MainButton optionalClass="w-1/2" title={no} onClick={onClickNo} />
      </div>
    </div>
  )
}
