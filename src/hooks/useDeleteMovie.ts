import React from 'react'
import axios from 'axios'

export default function useDeleteMoview() {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    status: 'idle',
    isIdle: true,
  })

  const mutate = React.useCallback(async (movieId) => {
    setState({isLoading: true, status: 'loading'})
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await axios.delete(`/api/movies/${movieId}`).then((res) => res.data)
      setState({isSuccess: true, status: 'success'})
    } catch (error) {
      setState({isError: true, status: 'error', error})
    }
  }, [])

  return [mutate, state]
}
