import { IWord } from '../types/types'
import { useCallback, useEffect, useState } from 'react'
import {
  useAddWordMutation,
  useGetWordsQuery,
  useUpdateWordMutation,
} from '../redux/services/wordsAPI'
import { Loader, ModalBox, WordForm, WordsTable } from '../components'

export const Home = () => {
  const { data, isLoading } = useGetWordsQuery()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [addWord, { isLoading: isSaving, isSuccess }] = useAddWordMutation()
  const [updateWord, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateWordMutation()

  const handleAddWord = useCallback(
    async (newWord: IWord) => {
      const duplicate = data?.find(
        (el) => el.word.toLowerCase() === newWord.word.toLowerCase()
      )

      if (duplicate) {
        await updateWord({
          _id: duplicate._id,
          word: newWord.word,
          translation: `${duplicate.translation}, ${newWord.translation}`,
          examples: duplicate.examples
            ? `${duplicate.examples}\n${newWord.examples}`
            : newWord.examples || undefined,
        })
      } else {
        await addWord({
          word: newWord.word,
          translation: newWord.translation,
          examples: newWord.examples || undefined,
        })
      }
    },
    [addWord, data, updateWord]
  )

  useEffect(() => {
    ;(isSuccess || isUpdateSuccess) && setIsOpenModal(false)
  }, [isSuccess, isUpdateSuccess])

  return (
    <div className="my-8 mx-4 md:w-5/6 md:mx-auto">
      {isLoading && <Loader />}

      {isOpenModal && (
        <ModalBox onClose={() => setIsOpenModal(false)}>
          <WordForm
            handleSubmit={handleAddWord}
            isLoading={isSaving || isUpdating}
          />
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
