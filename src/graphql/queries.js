import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories (
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
    ){
    repositories (
      orderDirection: $orderDirection,
      orderBy: $orderBy,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
    ){
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query authorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository ($id: ID!) {
    repository (id: $id) {
      url
      ...RepositoryDetails
      reviews {
        edges {
          node {
            id
            user {
              id
              username
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;
