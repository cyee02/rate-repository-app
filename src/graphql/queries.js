import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories (
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy
    ){
    repositories (
      orderDirection: $orderDirection,
      orderBy: $orderBy
    ){
      edges {
        node {
          ...RepositoryDetails
        }
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
