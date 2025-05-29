import { View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import theme from '../theme'
import Button from './Button'
import TextInputField from './TextInputField'
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 8,
  }
})

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder={'Username'}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={formik.errors.username ? formik.errors.username : null}
      />

      <TextInputField
        placeholder={'Password'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password ? formik.errors.password : null}
        secureTextEntry={true}
      />

      <Button text='Sign in' onPress={formik.handleSubmit} />
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signIn({ username, password })
    } catch (error) {
      console.log(error)
    }
  }
  return <SignInForm onSubmit={onSubmit} />
}

export default SignIn
