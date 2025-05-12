import { Link } from 'react-router-native'
import StyledText from '../StyledText'

const AppBarTab = ({text, to}) => {
  return (
  <Link to={to}>
    <StyledText fontWeight="bold" color='textPrimary'>{text}</StyledText>
  </Link>
)}

export default AppBarTab