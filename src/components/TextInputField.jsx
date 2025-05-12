import { TextInput, View } from 'react-native'
import StyledText from './StyledText'
import theme from '../theme'

const containerStyles = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: theme.colors.inputSecondary
}

const containerErrorStyles = { ...containerStyles, borderColor: theme.colors.errorColor }

const TextInputField = ({ placeholder, value, onChangeText, secureTextEntry, error }) => (
  <>
    <View style={ error ? containerErrorStyles : containerStyles }>
      <View style={ { flex: 1, padding: 5 } } >
        <TextInput
          placeholder={ placeholder }
          error={ true }
          value={ value }
          onChangeText={ onChangeText }
          secureTextEntry={ secureTextEntry ? secureTextEntry : false }
        />
      </View>
    </View>
    { error && (
      <StyledText style={ { color: theme.colors.errorColor } }>{ error }</StyledText>
    ) }
  </>
)

export default TextInputField