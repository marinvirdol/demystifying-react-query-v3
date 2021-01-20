import React from 'react'
import axios from 'axios'

export default function useSavePost() {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    status: 'idle',
    isIdle: true,
  })

  const mutate = React.useCallback(async (values) => {
    setState({isLoading: true, status: 'loading'})
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = await axios
        .patch(`/api/movies/${values.movieId}`, values)
        .then((res) => res.data)
      setState({isSuccess: true, status: 'success', data})
    } catch (error) {
      setState({isError: true, status: 'error', error})
    }
  }, [])

  return {...state, mutate}
}
