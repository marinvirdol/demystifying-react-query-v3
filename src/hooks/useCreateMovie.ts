import React from 'react'
import axios from 'axios'
import {message} from 'antd'

export default function useCreateMovie() {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    status: 'idle',
    isIdle: true,
  })

  const mutate = React.useCallback(async (values) => {
    setState({isLoading: true, status: 'loading'})
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = await axios.post('/api/movies', values).then((res) => res.data)
      setState({isSuccess: true, data, status: 'success'})
      message.success('Movie Create Successfully')
    } catch (error) {
      setState({isError: true, error, status: 'error'})
    }
  }, [])

  return {...state, mutate}
}
