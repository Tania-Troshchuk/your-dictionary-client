import { Link } from "react-router-dom"
import { Loader, TestCard } from "../components"
import { useGetWordsQuery } from "../redux/services/wordsAPI"
import { routes } from "../data/routes"

export const Test = () => {
  const { data, isLoading } = useGetWordsQuery()
  const testLength = 10
  const optionsLength = 4

  return (
    <div className="mx-4 md:mx-auto">
      {isLoading && <Loader />}

      {data && data?.length >= 10
        ? (
          <>
            <h2 className="mx-auto py-8 tracking-wide text-xl text-melrose-800 font-kalam">
              Try yourself
            </h2>

            <TestCard list={data} testLength={testLength} optionsLength={optionsLength} />
          </>
        )
        : (
          <div className="info-text">
            <p>
            {`To begin the test, you'll need at least ${testLength} words in your dictionary.`}
            </p>
            <p>
              <Link to={routes.home}>Add more words</Link>
              <span>{' '}to get started and enjoy learning!</span>
            </p>
          </div>
        )
      }
    </div>
  )
}
