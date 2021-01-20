import React from 'react'

export interface FilterState {
  current: number
  pageSize: number
  searchTerm: string
}

export function useFilter(initialState: FilterState) {
  const [filter, setFilter] = React.useState<FilterState>(initialState)

  return {filter, setFilter}
}
