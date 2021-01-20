import React from 'react'
import {Layout, Result, Menu, Typography, Spin} from 'antd'
import {ErrorBoundary, FallbackProps} from 'react-error-boundary'
import {Link, useLocation} from 'react-router-dom'
import useMovies from './hooks/useMovies'

interface Props {
  children: React.ReactElement
}

export default function AppShell(props: Props) {
  const location = useLocation()
  const moviesQuery = useMovies()
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Sider style={{color: '#fff'}}>
        <Layout.Header>
          <Typography.Title style={{color: '#fff'}}>IMDB</Typography.Title>
        </Layout.Header>
        <Menu selectedKeys={[location.pathname]} mode='inline' theme='dark'>
          <Menu.Item key='/movies'>
            <Link to='/movies'>Movies</Link>
          </Menu.Item>
          <Menu.Item key='/admin'>
            <Link to='/admin'>Admin</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{background: '#fff'}}>
          {moviesQuery.status === 'loading' ? (
            <Spin size='small' />
          ) : moviesQuery.status === 'success' ? (
            <Typography.Text>{`Number of movies: ${moviesQuery.data.data.length}`}</Typography.Text>
          ) : (
            <Typography.Text>Not available</Typography.Text>
          )}
        </Layout.Header>
        <Layout.Content style={{padding: '1rem'}}>
          <ErrorBoundary FallbackComponent={FallbackErrorComponent}>{props.children}</ErrorBoundary>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

function FallbackErrorComponent(props: FallbackProps) {
  return <Result status='error' title='Application Unavailable' />
}
