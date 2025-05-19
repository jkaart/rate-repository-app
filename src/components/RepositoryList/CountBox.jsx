import { View } from 'react-native'
import Text from '../Text'
import { countWithSuffix } from '../../utils/functions'

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
