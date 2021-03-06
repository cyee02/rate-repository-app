import { gql  } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(
      credentials: {
        username: $username,
        password: $password
      }
    ) {
      accessToken
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!,
    $ownerName: String!,
    $rating: Int!,
    $text: String
    ) {
    createReview(
      review: {
        repositoryName: $repositoryName,
        ownerName: $ownerName,
        rating: $rating,
        text: $text
      }
    ) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!,
    $password: String!,
    ) {
    createUser(
      user: {
        username: $username,
        password: $password
      }
    ) {
      username
      createdAt
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview ($id: ID!){
    deleteReview (id: $id)
  }
`;