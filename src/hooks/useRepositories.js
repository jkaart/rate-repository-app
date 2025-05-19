import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
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