import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

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

// export const ALL_BOOKS = gql`
//   query allBooks ($author: String, $genre: String) {
//     allBooks (
//       author: $author,
//       genre: $genre
//     ) {
//       ...BookDetails
//     }
//   }
//   ${BOOK_DETAILS}