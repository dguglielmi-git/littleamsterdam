import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation addLike($idPublication: ID!) {
    addLike(idPublication: $idPublication)
  }
`;

export const ADD_NOT_LIKE = gql`
  mutation addNotLike($idPublication: ID!) {
    addNotLike(idPublication: $idPublication)
  }
`;

export const ADD_TRASH = gql`
  mutation addTrash($idPublication: ID!) {
    addTrash(idPublication: $idPublication)
  }
`;

export const IS_LIKE = gql`
  query isLike($idPublication: ID!) {
    isLike(idPublication: $idPublication)
  }
`;

export const IS_NOT_LIKE = gql`
  query isNotLike($idPublication: ID!) {
    isNotLike(idPublication: $idPublication)
  }
`;

export const IS_TRASH = gql`
  query isTrash($idPublication: ID!) {
    isTrash(idPublication: $idPublication)
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($idPublication: ID!) {
    deleteLike(idPublication: $idPublication)
  }
`;

export const DELETE_NOT_LIKE = gql`
  mutation deleteNotLike($idPublication: ID!) {
    deleteNotLike(idPublication: $idPublication)
  }
`;

export const DELETE_TRASH = gql`
  mutation deleteTrash($idPublication: ID!) {
    deleteTrash(idPublication: $idPublication)
  }
`;

export const COUNT_LIKE = gql`
  query countLikes($idPublication: ID!) {
    countLikes(idPublication: $idPublication)
  }
`;

export const COUNT_NOT_LIKE = gql`
  query countNotLikes($idPublication: ID!) {
    countNotLikes(idPublication: $idPublication)
  }
`;

export const COUNT_TRASH = gql`
  query countTrash($idPublication: ID!) {
    countTrash(idPublication: $idPublication)
  }
`;