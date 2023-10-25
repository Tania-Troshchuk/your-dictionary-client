import { HTMLAttributes } from "react"
import { ResultsCircle } from ".."
import moment from "moment"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  result: number,
  words: string[]
  date?: string,
  onClickDelete?: () => void
}

export const ResultCard = (props: IProps) => {
  const { date, result, words, onClickDelete } = props

  return (
    <div className="p-6 md:px-12 md:min-w-[600px] lg:min-w-[700px] flex flex-col bg-melrose-50 rounded-lg shadow-lg text-melrose-800">
      {onClickDelete && (
        <button
          type="button"
          className="underline text-sm self-end text-melrose-400 hover:text-melrose-600"
          onClick={onClickDelete}
        >
          Delete result
        </button>
      )}

      <div className="py-2 tracking-wide text-xl text-melrose-800 font-kalam">
        {moment(date).format("dddd, MMMM Do YYYY")}
      </div>

      <div className="flex gap-8 sm:gap-20 justify-center">
        <ResultsCircle percent={result} />

        {
          result === 100
            ? (
              <div>Outstanding! You've achieved a flawless score on the test. Well done!</div>
            )
            : (
              <div>
                <p className="pb-2">Pay more attention to the words:</p>
                <ul className="list-disc list-inside text-sm">
                  {words.map(word => (
                    <li key={`${word}-${moment(date)}`}>{word}</li>
                  ))}
                </ul>
              </div>
            )
        }
      </div>
    </div>
  )
}
