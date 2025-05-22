import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_REVIEWS } from '../graphql/queries'

const useReviews = (id) => {
  const [reviewsData, setReviews] = useState([])

  const { data, loading } = useQuery(GET_REVIEWS, { variables: { repositoryId: id } })

  useEffect(() => {
    if (!loading) {
      const parsedReviews = {
        id: data.repository.id,
        fullName: data.repository.fullName,
        reviews: data.repository.reviews.edges.map(edge => edge.node)
      }
      setReviews(parsedReviews)
    }
  }, [data, loading])

  return { reviewsData, loading }
}

export default useReviews
