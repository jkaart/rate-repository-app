import { gql } from '@apollo/client'
import { USER } from './fragments'

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: {username: $username, password: $password}) {
      accessToken
    }
}
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
  createReview(review: {ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text}) {
    repositoryId
  }
}
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password}) {
      ...UserDetails
    }
  }
  ${USER}
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(id: $reviewId)
  }
`
