import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })

    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()

    navigate('/')
  }

  return [signIn, result]
}

export default useSignIn
