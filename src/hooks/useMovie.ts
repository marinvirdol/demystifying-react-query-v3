import React from 'react'
import axios from 'axios'

export const fetchMovie = (movieId: string) =>
  axios.get(`/api/movies/${movieId}`).then((res) => res.data)

export default function useMovie(movieId: string) {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    isLoading: true,
    status: 'loading',
  })

  const refetch = React.useCallback(async () => {
    setState({isLoading: true, status: 'loading'})
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const data = await fetchMovie(movieId)
      setState({isSuccess: true, status: 'success', data})
    } catch (error) {
      setState({isError: true, status: 'error', error})
    }
  }, [movieId])

  React.useEffect(() => {
    refetch()
  }, [refetch])

  return {
    ...state,
    refetch,
  }
}
