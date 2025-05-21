import { gql } from '@apollo/client'
import { REPOSITORY } from './fragments'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            ...RepositoryDetails
          }
        }
    }
  }
  ${REPOSITORY}
`

export const GET_SINGLE_REPOSITORY = gql`
  query singleRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
    }
  }
  ${REPOSITORY}
`

export const GET_USERINFO = gql`
  query {
    me {
      id
      username
    }
  }
`
