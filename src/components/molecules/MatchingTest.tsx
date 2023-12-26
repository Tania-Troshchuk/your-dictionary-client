import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DragItem, DropItem } from '../atoms'
import { getMatchingTestContent } from '../../utils/getTestContent'
import { IWord } from '../../types/types'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  testLength: number
  wordsList: IWord[]
  setResult: React.Dispatch<React.SetStateAction<number>>
  setWrongWords: React.Dispatch<React.SetStateAction<string[]>>
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>
}

export const MatchingTest = (props: IProps) => {
  const { testLength, wordsList, setResult, setShowResult, setWrongWords } =
    props

  const words: IWord[] = useMemo(() => {
    return getMatchingTestContent(wordsList, testLength)
  }, [wordsList, testLength])

  const initDragItems: string[] = useMemo(() => {
    return words.map((el) => el.translation)
  }, [words])

  const [userMatches, setUserMatches] = useState({
    initItems: initDragItems,
    selectedItems: Array(testLength).fill(''),
  })

  const handleDragContainer = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      newClass: string,
      oldCLass: string
    ) => {
      const target = e.target as Element

      e.preventDefault()

      target.classList.add(newClass)
      target.classList.remove(oldCLass)
    },
    []
  )

  const handleDropContainer = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()

      const text = e.dataTransfer.getData('text/plain')
      const isDupliate = userMatches.initItems.includes(text)

      if (isDupliate) return

      setUserMatches((prev) => {
        const index = prev.selectedItems.findIndex((el) => el === text)
        prev.selectedItems[index] = ''

        return {
          ...prev,
          initItems: [...prev.initItems, text],
        }
      })
    },
    [userMatches.initItems]
  )

  const handleDropItem = useCallback(
    (text: string, index: number) => {
      const duplicatedIndex = userMatches.selectedItems.findIndex(
        (el) => el === text
      )

      setUserMatches((prev) => {
        const newSelected = [...prev.selectedItems]

        if (duplicatedIndex !== -1) {
          newSelected[duplicatedIndex] = ''
        }

        newSelected[index] = text

        return {
          initItems: prev.initItems.filter((el) => el !== text),
          selectedItems: newSelected,
        }
      })
    },
    [userMatches]
  )

  const handleResult = useCallback(() => {
    let result = 0
    const wrongWords: string[] = []

    words.forEach((el, i) => {
      el.translation === userMatches.selectedItems[i]
        ? result++
        : wrongWords.push(el.word)
    })

    setWrongWords(wrongWords)
    setResult(result)
    setShowResult(true)
  }, [
    setResult,
    setShowResult,
    setWrongWords,
    userMatches.selectedItems,
    words,
  ])

  useEffect(() => {
    const fillMatches = userMatches.selectedItems.filter((el) => !!el)

    if (fillMatches.length === testLength) {
      handleResult()
    }
  }, [handleResult, testLength, userMatches.selectedItems])

  return (
    <>
      <h2 className="py-8 tracking-wide text-2xl text-melrose-800 font-kalam">
        Matching Test:
      </h2>

      <div className="mb-6 flex flex-col gap-8 items-center">
        <div
          className="w-[70vw] max-w-5xl min-h-[100px] p-2 flex gap-2 flex-wrap border-4 border-melrose-400 border-dashed rounded"
          onDragOver={(e) =>
            handleDragContainer(e, 'border-melrose-800', 'border-melrose-400')
          }
          onDragLeave={(e) =>
            handleDragContainer(e, 'border-melrose-400', 'border-melrose-800')
          }
          onDrop={handleDropContainer}
        >
          {userMatches.initItems.map((item) => (
            <DragItem key={item} text={item} className="h-8" />
          ))}
        </div>

        <div className="flex gap-4 w-full max-w-3xl">
          <div className="w-1/2 flex flex-col gap-2 text-white">
            {words.map(({ word }) => (
              <div
                key={word}
                className="flex justify-center items-center border h-12 rounded bg-melrose-400 break-all"
              >
                {word}
              </div>
            ))}
          </div>

          <div className="w-1/2 flex flex-col gap-2">
            {userMatches.selectedItems.map((el, i) =>
              el ? (
                <DragItem key={el} text={el} className="h-12" />
              ) : (
                <DropItem
                  key={i}
                  index={i}
                  className="h-12"
                  handleDrop={handleDropItem}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
