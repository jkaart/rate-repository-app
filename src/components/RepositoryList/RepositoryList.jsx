import { FlatList, View, StyleSheet } from 'react-native'
import { RepositoryInfo } from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={ styles.separator } />

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={ repositoryNodes }
      ItemSeparatorComponent={ <ItemSeparator /> }
      renderItem={ ({ item }) => (<RepositoryInfo repository={ item } viewSingle={ false } />) }
    />
  )
}

const RepositoryList = () => {
  const { repositories, loading } = useRepositories()
  if (loading) {
    return null
  }
  return <RepositoryListContainer repositories={ repositories } />
}

export default RepositoryList
