import { View, Image, StyleSheet } from 'react-native'
import Text from '../Text'
import theme from '../../theme'
import CountBox from './CountBox'

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    flexContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      gap: 10,
    },
    parentContainer: {
      paddingBottom: 50,
      backgroundColor: theme.colors.backgroundPrimary
    },
    image: {
      width: 32,
      height: 32,
      borderRadius: 3,
    },
    language: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      borderRadius: 4,
    },
    innerFlexContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      flexShrink: 1,
      gap: 3
    },
  })

  return (
    <View style={ styles.parentContainer }>
      <View style={ styles.flexContainer }>
        <View style={ { margin: 3 } }>
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
      <View style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }>
        <CountBox text='Stars' value={ item.stargazersCount } />
        <CountBox text='Forks' value={ item.forksCount } />
        <CountBox text='Reviews' value={ item.reviewCount } />
        <CountBox text='Ratings' value={ item.ratingAverage } />
      </View>
    </View>
  )
}

export default RepositoryItem
