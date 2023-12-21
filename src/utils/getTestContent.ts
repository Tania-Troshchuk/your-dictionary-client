import { IWord } from '../types/types'

export interface IQuizTestItem extends Pick<IWord, 'word' | 'translation'> {
  options: string[]
}

const getRandomIndex = (max: number) => Math.floor(Math.random() * max)

const getRandomWordIndexes = (count: number, list: IWord[]): number[] => {
  const wordIndexes: number[] = []

  while (wordIndexes.length < count) {
    const index = getRandomIndex(list.length)

    if (!wordIndexes.includes(index)) {
      wordIndexes.push(index)
    }
  }

  return wordIndexes
}

const getOptions = (word: IWord, list: IWord[], quantity: number) => {
  const options = [word.translation]

  while (options.length < quantity) {
    const index = getRandomIndex(list.length)
    const translation = list[index].translation

    if (!options.includes(translation)) {
      options.push(translation)
    }
  }

  return options
}

export const getQuizTestContent = (
  list: IWord[],
  quantity: number,
  optionsLength: number
): IQuizTestItem[] => {
  const indexes = getRandomWordIndexes(quantity, list)

  return indexes.map((el) => {
    const options = getOptions(list[el], list, optionsLength)

    return {
      word: list[el].word,
      translation: list[el].translation,
      options: [...options].sort(() => 0.5 - Math.random()),
    }
  })
}

export const getMatchingTestContent = (
  list: IWord[],
  quantity: number
): IWord[] => {
  const indexes = getRandomWordIndexes(quantity, list)

  return indexes.map((el) => {
    return {
      word: list[el].word,
      translation: list[el].translation,
    }
  })
}
