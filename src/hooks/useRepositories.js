import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, searchKeyword) => {
  const [repositories, setRepositories] = useState()
  const orderBy =
    order === 'latest'
      ? 'CREATED_AT'
      : order === 'highest'
        ? 'RATING_AVERAGE'
        : order === 'lowest'
          ? 'RATING_AVERAGE'
          : null

  const orderDirection =
    order === 'latest'
      ? 'DESC'
      : order === 'highest'
        ? 'DESC'
        : order === 'lowest'
          ? 'ASC'
          : null

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  })

  useEffect(() => {
    if (!loading) {
      setRepositories(data.repositories)
    }
  }, [data, loading])

  //return { repositories, loading, refetch: fetchRepositories }
  return { repositories, loading }
}

export default useRepositories