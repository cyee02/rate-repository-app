import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

// const BOOK_DETAILS = gql`
//   fragment BookDetails on Book {
//     title
//     author{
//       name
//     }
//     published
//     genres
//     id
//   }

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