import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!loading) {
      const response = data.repositories.edges
      const repositoryData = response.map(edge => edge.node)
      setRepositories(repositoryData)
    }
  }, [data, loading])

  //return { repositories, loading, refetch: fetchRepositories }
  return {repositories, loading}
}

export default useRepositories