import {Button, Result, Row, Col, Form, Input, PageHeader, Skeleton} from 'antd'
import {Link, useHistory, useParams} from 'react-router-dom'
import useMovie from '../../hooks/useMovie'
import useSaveMovie from '../../hooks/useSaveMovie'
import useDeleteMovie from '../../hooks/useDeleteMovie'

export default function AdminMovie() {
  const history = useHistory()
  const [form] = Form.useForm()
  const {movieId} = useParams<{movieId: string}>()
  const movieQuery = useMovie(movieId)
  const saveMovieMutation = useSaveMovie()
  const [deleteMovie, deleteMovieInfo] = useDeleteMovie()

  const handleSubmit = async (values: any) => {
    await saveMovieMutation.mutate({...values, movieId})
    await movieQuery.refetch()
  }

  const handleDelete = async () => {
    await deleteMovie(movieId)
    history.push('/admin')
  }

  return movieQuery.status === 'loading' ? (
    <Skeleton />
  ) : movieQuery.status === 'error' ? (
    <Result
      status='500'
      title='Oops! Something went wrong'
      extra={<Button onClick={() => movieQuery.refetch}>Retry</Button>}
    />
  ) : movieQuery.status === 'success' ? (
    <>
      <PageHeader
        onBack={() => history.goBack()}
        title={movieQuery.data.title}
        extra={[
          <Button key='view'>
            <Link to={`/movies/${movieQuery.data.id}`}>View Movie</Link>
          </Button>,
          <Button
            key='delete'
            type='primary'
            onClick={handleDelete}
            loading={deleteMovieInfo.status === 'loading'}
          >
            Delete
          </Button>,
        ]}
      />
      <Row>
        <Col span={12}>
          <h1>Edit Movie</h1>
          <Form onFinish={handleSubmit} form={form} initialValues={{...movieQuery.data}}>
            <Form.Item name='title' rules={[{required: true}]}>
              <Input />
            </Form.Item>

            <Form.Item name='plot' rules={[{required: true}]}>
              <Input.TextArea rows={5} />
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              loading={saveMovieMutation.status === 'loading'}
            >
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  ) : (
    <Skeleton />
  )
}
