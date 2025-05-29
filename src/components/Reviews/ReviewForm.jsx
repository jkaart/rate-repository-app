import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import * as yup from 'yup'
import { CREATE_REVIEW } from '../../graphql/mutations'

import TextInputField from '../TextInputField'
import Form from '../Form'
import Button from '../Button'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .integer('Rating must be integer')
    .min(0, 'Rating must be more or equal than 0')
    .max(100, 'Rating must be less or equal than 100')
    .required('Rating is required')
})


const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  return (
    <Form>
      <TextInputField
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        error={formik.errors.ownerName ? formik.errors.ownerName : null}
      />
      <TextInputField
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.errors.repositoryName ? formik.errors.repositoryName : null}
      />
      <TextInputField
        placeholder='Rating'
        value={formik.values.rating}
        keyboardType='numeric'
        onChangeText={formik.handleChange('rating')}
        error={formik.errors.rating ? formik.errors.rating : null}
      />
      <TextInputField
        placeholder='Review'
        value={formik.values.text}
        multiline={true}
        onChangeText={formik.handleChange('text')}
        error={formik.errors.text ? formik.errors.text : null}
      />

      <Button text='Add' onPress={formik.handleSubmit} />
    </Form>
  )
}

const AddReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { data } = await mutate({ variables: { ...values, rating: Number(values.rating) } })
    navigate(`/repository/${data.createReview.repositoryId}`)
  }
  return <ReviewForm onSubmit={onSubmit} />
}

export default AddReview