import { Pressable } from 'react-native'
import StyledText from '../Text'

const AppBarTab = ({text}) => {
  return (
  <Pressable>
    <StyledText fontWeight="bold" color='textPrimary'>{text}</StyledText>
  </Pressable>
)}

export default AppBarTab