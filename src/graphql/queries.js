import { gql } from '@apollo/client'
import { PAGE_INFO, REPOSITORY, REVIEW, USER } from './fragments'

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY}
  ${PAGE_INFO}
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
  query reviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${REVIEW}
  ${PAGE_INFO}
`

export const GET_USERINFO = gql`
  query getUserInfo($includeReviews: Boolean = false) {
    me {
      ...UserDetails
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }
  ${USER}
  ${REVIEW}
`
