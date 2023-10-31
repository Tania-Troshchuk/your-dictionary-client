import {
  Fragment,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import voiceIcon from '../../assets/voice.svg'
import { IWord } from '../../data/types'
import { ConfirmBox, ModalBox, WordForm } from '.'
import {
  useDeleteWordMutation,
  useUpdateWordMutation,
} from '../../redux/services/wordsAPI'
import { Loader } from '..'
import { getSpeech } from '../../redux/services/textToSpeechAPI'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  words: IWord[]
}

export interface ISelectedWord {
  word: IWord
  action: 'edit' | 'delete'
}

export const WordsTable = ({ words }: IProps) => {
  const [modalAction, setModalAction] = useState<null | ISelectedWord>(null)
  const [loadingSpeechId, setLoadingSpeechId] = useState<string | null>(null)
  const [deleteWord, { isLoading, isSuccess }] = useDeleteWordMutation()
  const [
    updateWord,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateWordMutation()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSpeech = useCallback(async (word: string, id?: string) => {
    id && setLoadingSpeechId(id)

    const data = await getSpeech({ text: word }).finally(() =>
      setLoadingSpeechId(null)
    )

    if (data && audioRef.current) {
      const blob = new Blob([data], { type: 'audio/wav' })
      const url = URL.createObjectURL(blob)

      audioRef.current.src = url
      audioRef.current.volume = 0.5
      await audioRef.current.play()
      URL.revokeObjectURL(url)
    }
  }, [])

  const handleEditWord = useCallback(
    async (word: IWord) => {
      await updateWord({
        _id: word._id,
        word: word.word,
        translation: word.translation,
        examples: word.examples ? word.examples : undefined,
      })
    },
    [updateWord]
  )

  const handleDeleteWord = useCallback(async () => {
    modalAction?.word._id && (await deleteWord(modalAction.word._id))
  }, [deleteWord, modalAction?.word._id])

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      setModalAction(null)
    }
  }, [isSuccess, isUpdateSuccess])

  return (
    <div>
      {(isLoading || isUpdateLoading) && <Loader />}
      <audio className="hidden" controls ref={audioRef} src="" />

      {modalAction && (
        <ModalBox onClose={() => setModalAction(null)}>
          {modalAction.action === 'edit' ? (
            <WordForm
              editedWord={modalAction.word}
              isLoading={false}
              handleSubmit={(word) => handleEditWord(word)}
            />
          ) : (
            <ConfirmBox
              item="word"
              text={modalAction.word.word}
              yes="Yes, delete"
              onClickNo={() => setModalAction(null)}
              onClickYes={handleDeleteWord}
            />
          )}
        </ModalBox>
      )}

      <div className="text-melrose-950 bg-melrose-50 rounded-lg">
        <div className="grid grid-cols-[repeat(2,_minmax(0,_1fr)),_100px] border-x-4 border-t-4 rounded-t-lg bg-melrose-300 font-kalam text-xl text-center">
          <div className="border-r p-2">Word:</div>
          <div className="border-r p-2">Translation:</div>
          <div className="p-2">Actions:</div>
        </div>

        <div className="grid grid-cols-[repeat(2,_minmax(0,_1fr)),_100px] border-x-4 border-b-4 rounded-b-lg break-words">
          {words.map((item) => (
            <Fragment key={item._id}>
              <div className="border-t-2 border-r px-2 py-1 md:px-4">
                {item.word}
              </div>
              <div className="border-t-2 border-r px-2 py-1 md:px-4">
                {item.translation}
              </div>
              <div className="border-t-2 px-3 py-2 flex justify-between">
                <button
                  onClick={() => handleSpeech(item.word, item._id)}
                  disabled={loadingSpeechId === item._id}
                  className="disabled:opacity-50"
                >
                  <img src={voiceIcon} alt="voice" />
                </button>

                <button
                  onClick={() => setModalAction({ word: item, action: 'edit' })}
                >
                  <img
                    src={editIcon}
                    alt="edit"
                    className="w-[18px] h-[18px]"
                  />
                </button>

                <button
                  onClick={() =>
                    setModalAction({ word: item, action: 'delete' })
                  }
                >
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="w-[18px] h-[18px]"
                  />
                </button>
              </div>

              {item.examples && (
                <div className="border-t-2 px-2 py-1 md:px-4 col-span-full text-sm text-melrose-800 italic font-light">
                  {item.examples}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
