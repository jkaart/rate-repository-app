import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../../theme'

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>{
        <View style={styles.scrollView}>
          <AppBarTab text='Repositories' to='/' />
          <AppBarTab text='Sign in' to='/signin' />
        </View>
      }</ScrollView>
    </View>
  )
}

export default AppBar