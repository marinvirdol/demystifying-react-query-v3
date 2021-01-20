import {useHistory, useParams} from 'react-router-dom'
import {Button, Result, Typography, Skeleton, PageHeader} from 'antd'
import useMovie from '../../hooks/useMovie'

export default function Movie() {
  let history = useHistory()
  const {movieId} = useParams<{movieId: string}>()
  const movieQuery = useMovie(movieId)

  return (
    <>
      {movieQuery.status === 'success' ? (
        <>
          <PageHeader onBack={() => history.goBack()} title={movieQuery.data.title} />
          <Typography.Paragraph style={{padding: '2rem'}}>
            {movieQuery.data.plot}
          </Typography.Paragraph>
        </>
      ) : movieQuery.status === 'error' ? (
        <Result
          status='500'
          title='Oops! Something went wrong.'
          extra={<Button onClick={movieQuery.fetch}>Retry</Button>}
        />
      ) : (
        <Skeleton />
      )}
    </>
  )
}
