import React, { useState, useEffect } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ModalBasic from "../../Modal/ModalBasic";
import AlbumForm from "../AlbumForm";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import { GET_ALBUMS } from "../../../gql/album";
import { map } from "lodash";
import AlbumPreview from "../AlbumPreview";
import "./AlbumList.scss";

export default function AlbumList() {
  const [isAlbum, setIsAlbum] = useState(false);
  const { auth } = useAuth();
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [albumSelected, setAlbumSelected] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);

  const { data, loading } = useQuery(GET_USER, {
    variables: { username },
  });
  const idUser = data.getUser.id;

  const {
    data: dataAlbum,
    loading: loadingAlbum,
    refetch: refetchAlbum,
  } = useQuery(GET_ALBUMS, {
    variables: { id: idUser },
  });

  useEffect(() => {
    setIsAlbum(username === auth.username);
  }, [username, auth.username]);

  if (loading || loadingAlbum) return null;

  const { getAlbums } = dataAlbum;

  const addAlbumModal = () => {
    setTitleModal("Ingrese Nombre de Album");
    setChildrenModal(
      <AlbumForm setShowModal={setShowModal} refetchAlbum={refetchAlbum} />
    );
    setShowModal(true);
  };

  return (
    <div className="album">
      {getAlbums ? (
        <React.Fragment>
          {isAlbum && (
            <div className="album__addButton" onClick={() => addAlbumModal()}>
              <Icon link name="plus" size="big" color="blue" />
              <p>Agregar Album</p>
            </div>
          )}
          {!albumSelected ? (
            <Grid columns={4}>
              {map(getAlbums, (album, index) => (
                <Grid.Column key={index}>
                  <AlbumPreview
                    album={album}
                    isAlbum={isAlbum}
                    refetchAlbum={refetchAlbum}
                  />
                </Grid.Column>
              ))}
            </Grid>
          ) : (
            <Grid columns={4}>
              <div>
                <h1>Album Seleccionado</h1>
              </div>
            </Grid>
          )}
        </React.Fragment>
      ) : (
        <div> No tiene albumes...</div>
      )}
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </div>
  );
}
