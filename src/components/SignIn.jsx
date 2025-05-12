import { TextInput, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import theme from '../theme'
import Button from './Button'

const initialValues = {
  username: '',
  password: '',
}

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  const styles = StyleSheet.create({
    container: {
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      backgroundColor: theme.colors.backgroundPrimary,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputPrimary,
      borderStyle: 'solid',
      borderWidth: 3,
      borderRadius: 5,
      borderColor: theme.colors.inputSecondary
    },
    input: {
      flex: 1,
      padding: 5,
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            placeholder='Username'
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
          />
        </View>

      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            placeholder='Password'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureTextEntry
          />
        </View>

      </View>
      <Button text='Sign-in' onPress={formik.handleSubmit}/>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  }
  return (<SignInForm onSubmit={onSubmit} />)
}

export default SignIn
