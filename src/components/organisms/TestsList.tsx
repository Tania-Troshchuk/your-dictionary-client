import { HTMLAttributes, useEffect, useState } from 'react'
import { IWord, TTestTypes } from '../../types/types'
import { useAddTestMutation } from '../../redux/services/testAPI'
import { MatchingTest, QuizTest, ResultCard } from '../molecules'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  type: TTestTypes
  testLength: number
  optionsLength: number
  list: IWord[]
}

export const TestsList = (props: IProps) => {
  const { type, testLength, optionsLength, list } = props

  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [wrongWords, setWrongWords] = useState<string[]>([])
  const [addTest] = useAddTestMutation()

  useEffect(() => {
    if (showResult) {
      addTest({
        result: (result * 100) / testLength,
        wrongWords,
      })
    }
  }, [addTest, showResult, result, testLength, wrongWords])

  if (showResult) {
    return (
      <div className="mt-12 md:mt-16">
        <ResultCard result={(result * 100) / testLength} words={wrongWords} />
      </div>
    )
  }

  return type === 'Quiz' ? (
    <QuizTest
      testLength={testLength}
      optionsLength={optionsLength}
      wordsList={list}
      setShowResult={setShowResult}
      setResult={setResult}
      setWrongWords={setWrongWords}
    />
  ) : (
    <MatchingTest
      testLength={testLength}
      wordsList={list}
      setShowResult={setShowResult}
      setResult={setResult}
      setWrongWords={setWrongWords}
    />
  )
}
