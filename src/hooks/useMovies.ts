import React from 'react'
import axios from 'axios'
import {FilterState} from './useFilter'

const fetchMoviesWrapper = async (filter?: FilterState) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let url = '/api/movies'
  if (filter) {
    url += `?_page=${filter.current}&_limit=${filter.pageSize}`
  }

  if (filter?.searchTerm) {
    url += `&q=${filter?.searchTerm}`
  }

  const data = await axios.get(url)
  return data
}

export default function useMovies(filter?: FilterState) {
  const [state, setState] = React.useReducer((_: any, action: any) => action, {
    isLoading: true,
    status: 'loading',
  })

  const refetch = React.useCallback(async () => {
    setState({status: 'loading', isLoading: true})

    try {
      const data = await fetchMoviesWrapper(filter)
      setState({status: 'success', isSuccess: true, data})
    } catch (error) {
      setState({status: 'error', isError: true, error})
    }
  }, [filter])

  React.useEffect(() => {
    refetch()
  }, [refetch])

  return {...state, refetch}
}
