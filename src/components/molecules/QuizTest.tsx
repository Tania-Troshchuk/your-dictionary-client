import React, { HTMLAttributes, useCallback, useMemo, useState } from 'react'
import { IQuizTestItem, getQuizTestContent } from '../../utils/getTestContent'
import { IWord } from '../../types/types'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  testLength: number
  optionsLength: number
  wordsList: IWord[]
  setResult: React.Dispatch<React.SetStateAction<number>>
  setWrongWords: React.Dispatch<React.SetStateAction<string[]>>
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuizTest = (props: IProps) => {
  const {
    testLength,
    optionsLength,
    wordsList,
    setResult,
    setWrongWords,
    setShowResult,
  } = props

  const [index, setIndex] = useState(0)

  const testItems = useMemo(
    () => getQuizTestContent(wordsList, testLength, optionsLength),
    [wordsList, optionsLength, testLength]
  )

  const handleClick = useCallback(
    async (choice: string, item: IQuizTestItem) => {
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
    [index, testLength, setResult, setShowResult, setWrongWords]
  )

  return (
    <>
      <h2 className="py-8 tracking-wide text-2xl text-melrose-800 font-kalam">
        Quiz Test:
      </h2>

      <div className="mx-auto py-10 px-[20px] md:pb-20 w-[80vw] bg-melrose-50 overflow-hidden rounded-lg shadow-lg text-melrose-800">
        <div
          className="w-[800vw] flex relative card-transition"
          style={{ left: `calc(-${index * 80}vw - 20px)` }}
        >
          {testItems.map((item, i) => (
            <div className="px-[20px] w-[80vw] box-border" key={item.word}>
              <div className="text-sm text-right text-melrose-400 italic tracking-wide">
                {`${i + 1}/${testLength}`}
              </div>

              <div className="flex flex-col gap-4">
                <div className="border-b text-center text-2xl font-kalam">
                  {item.word}
                </div>

                {item.options.map((option) => (
                  <button
                    key={option}
                    className="p-2 border border-melrose-300 rounded-full bg-melrose-100 hover:bg-melrose-200 w-full max-w-2xl self-center"
                    onClick={() => handleClick(option, item)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
