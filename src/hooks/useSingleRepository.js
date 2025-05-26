import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_SINGLE_REPOSITORY } from '../graphql/queries'

const useSingleRepository = (id) => {
  const [repositoryData, setRepository] = useState(null)

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (!loading) {
      setRepository(data.repository)
    }
  }, [data, loading])

  return { repositoryData, loading }
}

export default useSingleRepository
