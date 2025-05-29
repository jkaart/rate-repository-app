import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { RepositoryInfo } from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import TextInputField from '../TextInputField'
import theme from '../../theme'
import { useDebounce } from 'use-debounce'
import ItemSeparator from '../ItemSeparator'

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 5,
    padding: 5
  },
  searchContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    gap: 10,
    padding: 8,
  },
})

const OrderSelect = ({ order, setOrder }) => {
  return (
    <Picker
      selectedValue={order}
      onValueChange={(itemValue) => setOrder(itemValue)}
      prompt="Select order"
      style={styles.searchBar}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )
}

const Search = ({ search, setSearch }) => {
  return (
    <TextInputField placeholder="Search" value={search} onChangeText={setSearch} />
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { search, setSearch, order, setOrder } = this.props
    return (
      <>
        <View style={styles.searchContainer}>
          <Search search={search} setSearch={setSearch} />
          <OrderSelect order={order} setOrder={setOrder} />
        </View>
        <ItemSeparator />
      </>
    )
  }

  render() {
    const { repositories, onEndReach } = this.props
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={<ItemSeparator />}
        renderItem={({ item }) => (
          <RepositoryInfo repository={item} viewSingle={false} />
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest')
  const [search, setSearch] = useState('')
  const [value] = useDebounce(search, 500)

  const orderBy =
    order === 'latest'
      ? 'CREATED_AT'
      : order === 'highest'
        ? 'RATING_AVERAGE'
        : order === 'lowest'
          ? 'RATING_AVERAGE'
          : null

  const orderDirection =
    order === 'latest'
      ? 'DESC'
      : order === 'highest'
        ? 'DESC'
        : order === 'lowest'
          ? 'ASC'
          : null

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: value
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
    />
  )
}

export default RepositoryList
