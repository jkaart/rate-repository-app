import { View, Image, StyleSheet, Pressable, Linking } from 'react-native'
import Text from '../Text'
import theme from '../../theme'
import CountBox from './CountBox'
import Button from '../Button'
import { useNavigate, useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_REPOSITORY } from '../../graphql/queries'

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

const RepositoryItemContainer = ({ item, viewSingle }) => {
  if (viewSingle) {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, { variables: { repositoryId: id } })

    if (loading) {
      return null
    }
    const item = data.repository

    return (
      <>
        <RepositoryItem item={ item } />
        <View style={ styles.buttonContainer }>
          <Button text="Open in GitHub" onPress={ () => Linking.openURL(item.url) } />
        </View>
      </>
    )
  }

  const navigate = useNavigate()
  return (
    <Pressable onPress={ () => navigate(`/repository/${item.id}`) }>
      <RepositoryItem item={ item } />
    </Pressable>
  )
}

export default RepositoryItemContainer
