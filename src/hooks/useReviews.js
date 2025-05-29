import { useQuery } from '@apollo/client'
import { GET_REVIEWS } from '../graphql/queries'

const useReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, { variables })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }
  
  const parsedReviews = {
    id: data?.repository.id,
    fullName: data?.repository.fullName,
    reviews: data?.repository.reviews.edges.map(edge => edge.node)
  }

  return {
    reviews: parsedReviews,
    fetchMore: handleFetchMore,
    loading,
    ...result
  }
}

export default useReviews
