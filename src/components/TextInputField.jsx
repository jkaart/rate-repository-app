import { StyleSheet, TextInput, View } from 'react-native'
import Text from './Text'
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

const styles = StyleSheet.create({
  innerContainerStyle: {
    flex: 1,
    padding: 5
  }
})

const containerErrorStyles = { ...containerStyles, borderColor: theme.colors.errorColor }

const TextInputField = ({ placeholder, value, onChangeText, secureTextEntry, error }) => (
  <>
    <View style={ error ? containerErrorStyles : containerStyles }>
      <View style={ styles.innerContainerStyle } >
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
      <Text style={ { color: theme.colors.errorColor } }>{ error }</Text>
    ) }
  </>
)

export default TextInputField