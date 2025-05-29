import { useFormik } from 'formik'
import * as yup from 'yup'

import Form from './Form'
import Button from './Button'
import TextInputField from './TextInputField'
import useSignUp from '../hooks/useSignUp'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at 30 characters or less long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at 50 characters or less long'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <Form>
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

      <TextInputField
        placeholder={'Password confirmation'}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        error={formik.errors.passwordConfirmation ? formik.errors.passwordConfirmation : null}
        secureTextEntry={true}
      />

      <Button text="Sign up" onPress={formik.handleSubmit} />
    </Form>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signUp({ username, password })
    } catch (error) {
      console.log(error)
    }
  }
  return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp
