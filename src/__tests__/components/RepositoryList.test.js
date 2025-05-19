import { render, screen } from '@testing-library/react-native'
import { RepositoryListContainer } from '../../components/RepositoryList/RepositoryList'
import { countWithSuffix } from '../../utils/functions'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      render(<RepositoryListContainer repositories={ repositories } />)
      const repositoryItems = screen.getAllByTestId('repositoryItem')
      //const [firstRepositoryItem, secondRepositoryItem] = repositoryItems
      //screen.debug()
      for (const index in repositoryItems) {
        const node = repositories.edges[index].node
        const nodeStarsWithSuffix = countWithSuffix(node.stargazersCount)
        const nodeForksWithSuffix = countWithSuffix(node.forksCount)
        const nodeReviewsWithSuffix = countWithSuffix(node.reviewCount)
        const nodeRatingsWithSuffix = countWithSuffix(node.ratingAverage)
        expect(repositoryItems[index])
          .toHaveTextContent(
            node.fullName +
            node.description +
            node.language +
            nodeStarsWithSuffix + 'Stars' +
            nodeForksWithSuffix + 'Forks' +
            nodeReviewsWithSuffix + 'Reviews' +
            nodeRatingsWithSuffix + 'Ratings'
          )
      }
    })
  })
})