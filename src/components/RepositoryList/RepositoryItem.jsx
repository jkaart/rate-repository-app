import { View, Image, StyleSheet, Pressable, Linking, FlatList } from 'react-native'
import Text from '../Text'
import theme from '../../theme'
import CountBox from './CountBox'
import Button from '../Button'
import { useNavigate, useParams } from 'react-router-native'
import useSingleRepository from '../../hooks/useSingleRepository'
import useReviews from '../../hooks/useReviews'

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 25,
    marginVertical: 5
  },
  countsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
  },
  image: {
    borderRadius: 3,
    height: 32,
    width: 32,
  },
  imageContainer: {
    margin: 3
  },
  innerFlexContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexShrink: 1,
    gap: 3
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 5,
  },
  parentContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

const reviewStyles = StyleSheet.create({
  flexContainer: {
    ...styles.flexContainer,
    alignContent: 'space-between',
    backgroundColor: theme.colors.backgroundPrimary,
    marginBottom: 20,
    padding: 5
  },
  innerFlexContainer: {
    ...styles.innerFlexContainer,
  },
  revieWRatingContainer: {
    ...styles.innerFlexContainer,
    minHeight: 60,
    minWidth: 60,
  },
  reviewRatingCircle: {
    alignItems: 'center',
    aspectRatio: '1/1',
    borderColor: theme.colors.primary,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 50,
  }
})

export const RepositoryItem = ({ item }) => {
  return (
    <View testID='repositoryItem' style={ styles.parentContainer }>
      <View style={ styles.flexContainer }>
        <View style={ styles.imageContainer }>
          <Image
            style={ styles.image }
            source={ { uri: item.ownerAvatarUrl } }
          />
        </View>
        <View style={ styles.innerFlexContainer }>
          <Text color='default' fontWeight='bold'>{ item.fullName }</Text>
          <Text color='textSecondary'>{ item.description }</Text>
          <View style={ styles.language }>
            <Text color='textPrimary'>{ item.language }</Text>
          </View>
        </View>
      </View>
      <View style={ styles.countsContainer }>
        <CountBox text='Stars' value={ item.stargazersCount } />
        <CountBox text='Forks' value={ item.forksCount } />
        <CountBox text='Reviews' value={ item.reviewCount } />
        <CountBox text='Ratings' value={ item.ratingAverage } />
      </View>
    </View>
  )
}

export const RepositoryInfo = ({ repository, viewSingle }) => {
  if (viewSingle) {
    return (
      <>
        <RepositoryItem item={ repository } />
        <View style={ styles.buttonContainer }>
          <Button text="Open in GitHub" onPress={ () => Linking.openURL(repository.url) } />
        </View>
      </>
    )
  }

  const navigate = useNavigate()
  return (
    <Pressable onPress={ () => navigate(`/repository/${repository.id}`) }>
      <RepositoryItem item={ repository } />
    </Pressable>
  )
}

const ReviewRating = ({ value }) => (
  <View style={ reviewStyles.revieWRatingContainer }>
    <View style={ reviewStyles.reviewRatingCircle }>
      <Text color='primary' fontWeight='bold' fontSize='large'>{ value }</Text>
    </View>
  </View>

)

const formatDate = (value) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
  const date = new Date(value)
  return date.toLocaleDateString('fi-FI', options)
}

const ReviewItem = ({ review }) => {
  return (
    <View key={ review.id } style={ reviewStyles.flexContainer }>
      <ReviewRating value={ review.rating } />
      <View style={ reviewStyles.innerFlexContainer }>
        <Text fontWeight='bold'>{ review.user.username }</Text>
        <Text color='textSecondary'>{ formatDate(review.createdAt) }</Text>
          <Text>{ review.text }</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const repository = useSingleRepository(id)
  const reviews = useReviews(id)

  if (repository.loading || !repository.repositoryData || reviews.loading || !reviews.reviewsData) {
    return null
  }

  return (
    <FlatList
      data={ reviews.reviewsData.reviews }
      renderItem={ ({ item }) => <ReviewItem review={ item } /> }
      keyExtractor={ ({ id }) => id }
      ListHeaderComponent={ () => <RepositoryInfo repository={ repository.repositoryData } viewSingle={ true } /> }
    // ...
    />
  )

}

export default SingleRepository
