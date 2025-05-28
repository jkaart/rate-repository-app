import { StyleSheet, View } from 'react-native'
import { formatDate } from '../../utils/functions'
import theme from '../../theme'
import Text from '../Text'

const styles = StyleSheet.create({
  flexContainer: {
    alignContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.backgroundPrimary,
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 10,
    padding: 5,
  },
  innerFlexContainer: {
    display: 'flex',
    flexShrink: 1,
    gap: 3
  },
  reviewRatingCircle: {
    alignItems: 'center',
    aspectRatio: '1/1',
    borderColor: theme.colors.primary,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 3,
    height: 50,
    justifyContent: 'center',
    width: 50,
  }
})

const ReviewRating = ({ value }) => (
  <View style={ styles.reviewRatingCircle }>
    <Text color='primary' fontWeight='bold' fontSize='large'>{ value }</Text>
  </View>
)

const ReviewItem = ({ review, children }) => {
  const containerStyle = children ? styles.flexContainer : { ...styles.flexContainer, marginBottom: 20 }
  return (
    <>
      <View key={ review.id } style={ containerStyle }>
        <ReviewRating value={ review.rating } />
        <View style={ styles.innerFlexContainer }>
          <Text fontWeight='bold'>{ review.user.username }</Text>
          <Text color='textSecondary'>{ formatDate(review.createdAt) }</Text>
          { review.repository ? <Text fontWeight='bold'>{ review.repository.fullName }</Text> : null }
          { review.text ? (<Text>{ review.text }</Text>) : null}
        </View>
      </View>
      { children }
    </>
  )
}

export default ReviewItem