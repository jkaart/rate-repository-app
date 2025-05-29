import { View, Image, StyleSheet, Pressable, Linking, FlatList } from 'react-native'
import Text from '../Text'
import theme from '../../theme'
import CountBox from './CountBox'
import Button from '../Button'
import { useNavigate, useParams } from 'react-router-native'
import useSingleRepository from '../../hooks/useSingleRepository'
import useReviews from '../../hooks/useReviews'
import ReviewItem from '../Reviews/ReviewItem'

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-around',
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

export const RepositoryItem = ({ item }) => {
  if (!item) {
    return null
  }

  return (
    <View testID='repositoryItem' style={styles.parentContainer}>
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.innerFlexContainer}>
          <Text color='default' fontWeight='bold'>{item.fullName}</Text>
          {item.description && (<Text color='textSecondary'>{item.description}</Text>)}
          {item.language &&
            (<View style={styles.language}>
              <Text color='textPrimary'>{item.language}</Text>
            </View>)}
        </View>
      </View>
      <View style={styles.countsContainer}>
        <CountBox text='Stars' value={item.stargazersCount} />
        <CountBox text='Forks' value={item.forksCount} />
        <CountBox text='Reviews' value={item.reviewCount} />
        <CountBox text='Ratings' value={item.ratingAverage} />
      </View>
    </View>
  )
}

export const RepositoryInfo = ({ repository, viewSingle }) => {
  const navigate = useNavigate()
  if (viewSingle) {
    return (
      <>
        <RepositoryItem item={repository} />
        <View style={styles.buttonContainer}>
          <Button text='Open in GitHub' onPress={() => Linking.openURL(repository.url)} />
        </View>
      </>
    )
  }

  return (
    <Pressable onPress={() => navigate(`/repository/${repository.id}`)}>
      <RepositoryItem item={repository} />
    </Pressable>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const repository = useSingleRepository(id)
  const { reviews, fetchMore } = useReviews({ repositoryId: id, first: 8 })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviews?.reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository.repositoryData} viewSingle={true} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository
