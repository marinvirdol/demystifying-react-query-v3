import useMovies from '../../hooks/useMovies'
import useCreateMovie from '../../hooks/useCreateMovie'
import {Button, Result, Table, Form, Input, Row, Col, Space} from 'antd'
import {Link} from 'react-router-dom'
import {TablePaginationConfig} from 'antd/lib/table'
import {useFilter} from '../../hooks/useFilter'

export default function Admin() {
  const {filter, setFilter} = useFilter({
    current: 1,
    pageSize: 5,
    searchTerm: '',
  })

  const [form] = Form.useForm()
  const moviesQuery = useMovies(filter)

  const createMovieMutation = useCreateMovie()

  const handleSubmit = async (values: any) => {
    await createMovieMutation.mutate(values)
    moviesQuery.refetch()
    form.resetFields()
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilter({
      ...filter,
      ...{
        current: pagination.current as number,
        pageSize: pagination.pageSize as number,
      },
    })
  }

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      current: 1,
      pageSize: filter.pageSize,
      searchTerm: evt.currentTarget?.value,
    })
  }

  return (
    <>
      {moviesQuery.status === 'error' ? (
        <Result
          status='500'
          title='Oops! Something went wrong'
          subTitle={(moviesQuery.error as any).message}
          extra={<Button onClick={() => moviesQuery.refetch()}>Retry</Button>}
        />
      ) : (
        <Space size='large' direction='vertical' style={{width: '100%'}}>
          <Input onChange={handleSearchChange} style={{width: '50%'}} />
          <Table
            loading={moviesQuery.status === 'loading'}
            size='small'
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (title, movie) => <Link to={`/admin/${movie.id}`}>{title}</Link>,
              },
            ]}
            rowKey='id'
            dataSource={moviesQuery.data?.data}
            onChange={handleTableChange}
            pagination={{
              current: filter.current,
              pageSize: filter.pageSize,
              total: moviesQuery.data?.headers['x-total-count'],
            }}
          />
        </Space>
      )}

      <Row>
        <Col span={12}>
          <h1>Create New Movie</h1>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item name='title' rules={[{required: true}]}>
              <Input />
            </Form.Item>

            <Form.Item name='plot' rules={[{required: true}]}>
              <Input.TextArea rows={5} />
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              loading={createMovieMutation.status === 'loading'}
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}
