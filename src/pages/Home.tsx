import { IWord } from '../types/types'
import { useCallback, useEffect, useState } from 'react'
import {
  useAddWordMutation,
  useGetWordsQuery,
} from '../redux/services/wordsAPI'
import { Loader, ModalBox, WordForm, WordsTable } from '../components'

export const Home = () => {
  const { data, isLoading } = useGetWordsQuery()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [addWord, { isLoading: isSaving, isSuccess }] = useAddWordMutation()

  const handleAddWord = useCallback(
    async (word: IWord) => {
      await addWord({
        word: word.word,
        translation: word.translation,
        examples: word.examples || undefined,
      })
    },
    [addWord]
  )

  useEffect(() => {
    isSuccess && setIsOpenModal(false)
  }, [isSuccess])

  return (
    <div className="my-8 mx-4 md:w-5/6 md:mx-auto">
      {isLoading && <Loader />}

      {isOpenModal && (
        <ModalBox onClose={() => setIsOpenModal(false)}>
          <WordForm handleSubmit={handleAddWord} isLoading={isSaving} />
        </ModalBox>
      )}

      <button
        type="button"
        onClick={() => setIsOpenModal(true)}
        className="px-4 py-2 mb-8 bg-melrose-200 border border-melrose-400 rounded-full font-kalam text-lg text-melrose-800 hover:bg-melrose-300"
      >
        Add new word
      </button>

      {data?.length ? (
        <WordsTable words={data} />
      ) : (
        <div className="info-text">
          <span>Start by adding a word. Click </span>
          <span className="underline">Add new word</span>
          <span> at the top.</span>
        </div>
      )}
    </div>
  )
}
