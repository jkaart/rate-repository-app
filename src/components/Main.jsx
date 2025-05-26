import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList/RepositoryList'
import AppBar from './AppBar/AppBar'
import theme from '../theme'
import SignIn from './SignIn'
import RepositoryItem from './RepositoryList/RepositoryItem'
import AddReview from './Review'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={ styles.container }>
      <AppBar />
      <Routes>
        <Route path='/' element={ <RepositoryList /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/addreview' element={ <AddReview /> } />
        <Route path='/repository/:id' element={ <RepositoryItem viewSingle={ true } /> } />
        <Route path="*" element={ <Navigate to="/" replace /> } />
      </Routes>
    </View>
  )
}

export default Main