import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      comment
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      comment
      createAt
      idUser {
        username
        avatar
      }
    }
  }
`;

export const COUNT_COMMENTS = gql`
  query countComments($idPublication: ID!) {
    countComments(idPublication: $idPublication)
  }
`;