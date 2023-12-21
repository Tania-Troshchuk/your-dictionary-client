import { Link } from 'react-router-dom'
import { Card, Loader, TestsList } from '../components'
import { useGetWordsQuery } from '../redux/services/wordsAPI'
import { routes } from '../data/routes'
import { useState } from 'react'
import { TTestTypes } from '../types/types'

export const Test = () => {
  const { data, isLoading } = useGetWordsQuery()

  const [testType, setTestType] = useState<null | TTestTypes>(null)

  const testLength = 10
  const optionsLength = 4

  if (!data || data.length < testLength) {
    return (
      <>
        {isLoading && <Loader />}

        <div className="info-text">
          <p>
            {`To begin the test, you'll need at least ${testLength} words in your dictionary.`}
          </p>
          <p>
            <Link to={routes.home}>Add more words</Link>
            <span> to get started and enjoy learning!</span>
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="mx-4 md:mx-auto">
      {testType ? (
        <TestsList
          type={testType}
          list={data}
          testLength={testLength}
          optionsLength={optionsLength}
        />
      ) : (
        <>
          <h2 className="mx-auto py-8 tracking-wide text-2xl text-melrose-800 font-kalam">
            Try yourself
          </h2>

          <div className="flex gap-10">
            <Card
              title="Quiz Test"
              description={`Take a brief test: you'll be presented with ${testLength} words, each
                accompanied by ${optionsLength} possible translations.`}
              onClick={() => setTestType('Quiz')}
            />

            <Card
              className="hidden lg:flex"
              title="Matching Test"
              description={`Take a brief test: you will be given ${testLength} words along
                with their corresponding translations. Your task is 
                to match them in the correct order.`}
              onClick={() => setTestType('Matching')}
            />
          </div>
        </>
      )}
    </div>
  )
}
