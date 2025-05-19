import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={ styles.separator } />

const RepositoryList = () => {
  const { repositories, loading } = useRepositories()
  if (loading) {
    return null
  }
  return (
    <FlatList
      data={ repositories }
      ItemSeparatorComponent={ <ItemSeparator /> }
      renderItem={ ({ item, id }) => (<RepositoryItem item={ item } id={ id } />) }
    // other props
    />
  )
}

export default RepositoryList