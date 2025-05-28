import { useMutation, useQuery } from '@apollo/client'
import { GET_USERINFO } from '../../graphql/queries'
import { Alert, FlatList, Platform, StyleSheet, View } from 'react-native'
import ItemSeparator from '../ItemSeparator'
import ReviewItem from './ReviewItem'
import Button from '../Button'
import theme from '../../theme'
import { useNavigate } from 'react-router-native'
import { DELETE_REVIEW } from '../../graphql/mutations'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
    justifyContent: Platform.select({ native: 'center' }),
    padding: 5,
  }
})

const ReviewActions = ({ reviewId, repositoryId }) => {
  const navigate = useNavigate()
  const [mutate] = useMutation(DELETE_REVIEW)

  const deleteHandler = async () => {
    const deleteMutate = async () => {
      await mutate({
        variables: { reviewId },
        refetchQueries: [{ query: GET_USERINFO, variables: { includeReviews: true } }]
      })
    }

    if (Platform.OS === 'web') {
      const confirm = window.confirm('Are you sure you want delete this review?')
      if (confirm) {
        deleteMutate()
      }
    }
    else {
      Alert.alert(
        'Delete review',
        'Are you sure you want delete this review?', [
        {
          text: 'Cancel',
          onPress: () => { console.log('cancel') },
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => { deleteMutate() },
        }
      ])
    }
  }

  return (
    <View style={ styles.container }>
      <Button text='View repository' onPress={ () => navigate(`/repository/${repositoryId}`) } />
      <Button text='Delete review' onPress={ deleteHandler } color='red' />
    </View>
  )
}

const ReviewsList = () => {
  const { data, loading } = useQuery(GET_USERINFO, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  })
  if (loading) {
    return null
  }
  const reviews = data.me.reviews.edges.map((review) => review.node)
  return (
    <FlatList
      data={ reviews }
      ItemSeparatorComponent={ <ItemSeparator /> }
      renderItem={ ({ item }) => (<ReviewItem review={ item }>{ <ReviewActions reviewId={ item.id } repositoryId={ item.repository.id } /> }</ReviewItem>) }
    />
  )


}

export default ReviewsList