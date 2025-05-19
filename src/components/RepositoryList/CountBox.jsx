import { View } from 'react-native'
import Text from '../Text'

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
      <View style={ { alignItems: 'center' } }>
        <Text fontWeight='bold' color='default'>{ count }</Text>
        <Text color='textSecondary'>{ text }</Text>
      </View>
    </>
  )
}

export default CountBox
