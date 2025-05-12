import { View } from 'react-native'
import StyledText from '../StyledText'

const countWithSuffix = (value) => {
  if (!isNaN(value) && value >= 1000) {
    const count = value / 1000
    return `${count.toFixed(1)} k`
  }
  return value
}

const CountBox = ({ text, value }) => {
  const count = countWithSuffix(value)
  return (
    <>
      <View style={{alignItems: 'center'}}>
          <StyledText fontWeight='bold' color='default'>{count}</StyledText>
          <StyledText color='textSecondary'>{text}</StyledText>
        </View>
    </>
    
  )
}

export default CountBox
