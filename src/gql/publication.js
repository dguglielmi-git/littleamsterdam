import { gql } from "@apollo/client";

export const PUBLISH = gql`
  mutation publish($file: Upload, $album: String) {
    publish(file: $file, album: $album) {
      status
      urlFile
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query getPublications($username: String!, $idAlbum: String) {
    getPublications(username: $username, idAlbum: $idAlbum) {
      id
      idUser
      file
      typeFile
      createAt
    }
  }
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
  query getPublicationsFolloweds {
    getPublicationsFolloweds {
      id
      idUser {
        name
        username
        avatar
      }
      file
      typeFile
      createAt
    }
  }
`;
