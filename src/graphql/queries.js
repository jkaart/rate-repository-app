import { gql } from '@apollo/client'
import { REPOSITORY, REVIEW, USER } from './fragments'

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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

export const GET_REVIEWS = gql`
  query reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW}
`

export const GET_USERINFO = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER}
`
