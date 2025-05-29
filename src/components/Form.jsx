import { StyleSheet, View } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 8,
  }
})

const Form = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)

export default Form