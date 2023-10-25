import { HTMLAttributes, useCallback, useState } from 'react'
import { LineInput, MainButton } from '..'
import classNames from 'classnames'
import { IWord } from '../../data/types'

interface IProps extends HTMLAttributes<HTMLFormElement> {
  isLoading: boolean
  handleSubmit: (value: IWord) => void
  editedWord?: IWord
}

export const WordForm = (props: IProps) => {
  const { editedWord, isLoading, handleSubmit } = props

  const maxLenght = 300
  const [word, setWord] = useState<IWord>({
    _id: editedWord?._id,
    word: editedWord?.word ?? '',
    translation: editedWord?.translation ?? '',
    examples: editedWord?.examples ?? '',
  })

  const handleInput = useCallback((value: string, key: keyof IWord) => {
    setWord((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  return (
    <form
      className="p-6 flex gap-8 flex-col items-center bg-melrose-50 rounded-lg shadow-lg"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(word)
      }}
    >
      <LineInput
        value={word.word}
        handleInput={(value) => handleInput(value, 'word')}
        placeholder="new word"
      />

      <LineInput
        value={word.translation}
        handleInput={(value) => handleInput(value, 'translation')}
        placeholder="translation"
      />

      <div className="w-full">
        <p className="tracking-wide text-lg text-melrose-600 font-kalam">
          Boost memory with real examples:
        </p>

        <textarea
          className={classNames(
            'p-4 resize-none w-full border-2 rounded border-melrose-300 outline-none tracking-wide text-melrose-800',
            'placeholder:text-slate-400 placeholder:tracking-wider'
          )}
          value={word.examples}
          onChange={(e) => handleInput(e.target.value, 'examples')}
          rows={7}
          maxLength={maxLenght}
          placeholder="Not provided yet..."
        />

        <div className="text-sm text-end text-melrose-400">
          {`${word.examples?.length}/${maxLenght}`}
        </div>
      </div>

      <MainButton
        type="submit"
        title={editedWord ? 'Edit word' : 'Add new word'}
        optionalClass="w-full"
        onClick={() => handleSubmit(word)}
        disabled={!word.word || !word.translation || isLoading}
      />
    </form>
  )
}
