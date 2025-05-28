import { Pressable } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.colors.primary,
  borderRadius: 5,
  paddingVertical: 10,
  paddingHorizontal: 15,
}

const Button = ({ text, onPress, color }) => (
  <Pressable onPress={ onPress } style={ color ? { ...styles, backgroundColor: color } : styles }>
    <Text fontWeight='bold' color='textPrimary'>{ text }</Text>
  </Pressable>
)

export default Button