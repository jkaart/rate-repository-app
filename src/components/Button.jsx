import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import StyledText from './StyledText'

const styles = StyleSheet.create({
  backgroundColor: theme.colors.primary,
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 15,
})

const Button = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles}>
    <StyledText color='textPrimary'>{text}</StyledText>
  </Pressable>
)

export default Button