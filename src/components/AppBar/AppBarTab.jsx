import { Link } from 'react-router-native'
import Text from '../Text'

const AppBarTab = ({ text, to, onPress }) => {
  return (
    <Link to={ to } onPress={ onPress }>
      <Text fontWeight="bold" color='textPrimary'>{ text }</Text>
    </Link>
  )
}

export default AppBarTab