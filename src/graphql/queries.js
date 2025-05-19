import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
          }
        }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: {username: $username, password: $password}) {
      accessToken
    }
}
`

export const GET_USERINFO = gql`
  query {
    me {
      id
      username
    }
  }
`
