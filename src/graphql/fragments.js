import { gql } from '@apollo/client'

export const REPOSITORY = gql`
  fragment RepositoryDetails on Repository {
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
`

export const USER = gql`
  fragment UserDetails on User {
    id
    username
  }
`

export const REVIEW = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      ...UserDetails
    }
  }
  ${USER}
`