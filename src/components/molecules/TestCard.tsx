import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IWord } from '../../data/types'
import { ITestItem, getTestContent } from '../../utils/getTestContent'
import { useAddTestMutation } from '../../redux/services/testAPI'
import { ResultCard } from '.'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  testLength: number
  optionsLength: number
  list: IWord[]
}

export const TestCard = (props: IProps) => {
  const { testLength, optionsLength, list } = props

  const [index, setIndex] = useState(0)
  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [wrongWords, setWrongWords] = useState<string[]>([])
  const [addTest] = useAddTestMutation()

  const testContent = useMemo(
    () => getTestContent(list, testLength, optionsLength),
    [list, optionsLength, testLength]
  )

  const handleClick = useCallback(
    async (choice: string, item: ITestItem) => {
      const nextIndex = index + 1

      if (choice === item.translation) {
        setResult((prev) => prev + 1)
      } else {
        setWrongWords((prev) => [...prev, item.word])
      }

      if (nextIndex < testLength) {
        setIndex(nextIndex)
      } else {
        setShowResult(true)
      }
    },
    [index, testLength]
  )

  useEffect(() => {
    if (showResult) {
      addTest({
        result: (result * 100) / testLength,
        wrongWords,
      })
    }
  }, [addTest, showResult, result, testLength, wrongWords])

  return showResult ? (
    <ResultCard result={(result * 100) / testLength} words={wrongWords} />
  ) : (
    <div className="mx-auto py-10 px-[20px] md:pb-20 w-[80vw] bg-melrose-50 overflow-hidden rounded-lg shadow-lg text-melrose-800">
      <div
        className="w-[800vw] flex relative card-transition"
        style={{ left: `calc(-${index * 80}vw - 20px)` }}
      >
        {testContent.map((test, i) => (
          <div className="px-[20px] w-[80vw] box-border" key={test.word}>
            <div className="text-sm text-right text-melrose-400 italic tracking-wide">
              {`${i + 1}/${testLength}`}
            </div>

            <div className="flex flex-col gap-4">
              <div className="border-b text-center text-2xl font-kalam">
                {test.word}
              </div>

              {test.options.map((option) => (
                <button
                  key={option}
                  className="p-2 border border-melrose-300 rounded-full bg-melrose-100 hover:bg-melrose-200 w-full max-w-2xl self-center"
                  onClick={() => handleClick(option, test)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
