import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../../theme'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USERINFO } from '../../graphql/queries'
import useAuthStorage from '../../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.colors.secondary,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
  }
})

const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const { data } = useQuery(GET_USERINFO)

  const signOutHandler = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')

    console.log('Sign out')
  }

  return (
    <View style={ styles.container }>
      <ScrollView horizontal>{
        <View style={ styles.scrollView }>
          <AppBarTab text='Repositories' to='/' />
          { data && data.me === null
            ? <AppBarTab text='Sign in' to='/signin' />
            : <AppBarTab text='Sign out' onPress={ signOutHandler } />
          }
        </View>
      }</ScrollView>
    </View>
  )
}

export default AppBar