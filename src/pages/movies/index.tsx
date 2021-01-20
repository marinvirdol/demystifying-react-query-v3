import {Button, Input, Result, Space, Table} from 'antd'
import useMovies from '../../hooks/useMovies'
import {Link} from 'react-router-dom'
import {useFilter} from '../../hooks/useFilter'
import {TablePaginationConfig} from 'antd/lib/table'

export default function Movies() {
  const {filter, setFilter} = useFilter({
    current: 1,
    pageSize: 5,
    searchTerm: '',
  })

  const moviesQuery = useMovies(filter)

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

  return moviesQuery.status === 'error' ? (
    <Result
      status='500'
      title='Oops! Something went wrong.'
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
            render: (title, movie) => <Link to={`/movies/${movie.id}`}>{title}</Link>,
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
  )
}
