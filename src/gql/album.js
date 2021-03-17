import { gql } from "@apollo/client";

export const ADD_ALBUM = gql`
  mutation addAlbum($input: AlbumInput) {
    addAlbum(input: $input) {
      title
    }
  }
`;

export const GET_ALBUMS = gql`
  query getAlbums($id: ID) {
    getAlbums(id: $id) {
      picture
      createAt
      title
      id
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation removeAlbum($idAlbum: ID!) {
    removeAlbum(idAlbum: $idAlbum)
  }
`;

export const COUNT_ALBUM = gql`
query countAlbums($idUser: ID!) {
  countAlbums(idUser: $idUser)
}`;