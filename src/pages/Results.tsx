import { useCallback, useState } from 'react'
import { ConfirmBox, Loader, ModalBox, ResultCard } from '../components'
import {
  useDeleteTestMutation,
  useGetTestsQuery,
} from '../redux/services/testAPI'
import { Link } from 'react-router-dom'
import { routes } from '../data/routes'

export const Results = () => {
  const { data, isLoading } = useGetTestsQuery()
  const [deleteResult, { isLoading: isDeleteLoading }] = useDeleteTestMutation()
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const handleDeleteResult = useCallback(
    async (_id: string) => {
      await deleteResult(_id)
      setIdToDelete(null)
    },
    [deleteResult]
  )

  return (
    <div className="m-4 md:mx-auto">
      {(isLoading || isDeleteLoading) && <Loader />}

      {idToDelete && (
        <ModalBox onClose={() => setIdToDelete(null)}>
          <ConfirmBox
            item="result"
            onClickYes={() => handleDeleteResult(idToDelete)}
            onClickNo={() => setIdToDelete(null)}
          />
        </ModalBox>
      )}

      {data?.length ? (
        <>
          <h2 className="py-8 tracking-wide text-2xl text-melrose-800 font-kalam">
            Your tests results:
          </h2>

          <div className="flex flex-col gap-8">
            {data.map((result) => (
              <ResultCard
                key={result._id}
                date={result.passingDate}
                result={result.result}
                words={result.wrongWords}
                onClickDelete={() => setIdToDelete(result._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="info-text">
          To view your results, you must successfully complete the test. Please{' '}
          <Link to={routes.test}>click here</Link> to go to the Test page.
        </div>
      )}
    </div>
  )
}
