import { StatusBar } from 'expo-status-bar'
import { NativeRouter } from 'react-router-native'
import Main from './src/components/Main'

const App = () => {
  return (
    <>
      <NativeRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}

export default App
