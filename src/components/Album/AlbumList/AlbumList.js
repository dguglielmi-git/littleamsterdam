import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import AlbumForm from "../AlbumForm";
import AlbumPreview from "../AlbumPreview";
import useAuth from "../../../hooks/useAuth";
import ModalBasic from "../../Modal/ModalBasic";
import { Grid, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import { GET_ALBUMS } from "../../../gql/album";
import { GET_PUBLICATIONS } from "../../../gql/publication";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import PreviewPublication from "../../Publications/PreviewPublication";
import "./AlbumList.scss";

export default function AlbumList() {
  const { auth } = useAuth();
  const { username } = useParams();
  const { width } = useWindowDimensions();
  const [isAlbum, setIsAlbum] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);
  const [albumSelected, setAlbumSelected] = useState(false);
  const [idAlbumSelected, setIdAlbumSelected] = useState("-1");

  const ADD_ALBUM = "Agregar Album";
  const NOT_ALBUM_FOUND = "No tiene albumes...";
  const EMPTY_ALBUM = "Este album esta vacio...";
  const INPUT_ALBUM_NAME = "Ingrese Nombre de Album";

  const { data, loading } = useQuery(GET_USER, {
    variables: { username },
  });

  const {
    data: dataPublication,
    loading: loadingPublication,
    refetch: refetchPublication,
  } = useQuery(GET_PUBLICATIONS, {
    variables: { username, idAlbum: idAlbumSelected },
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

  if (loading || loadingAlbum || loadingPublication) return null;

  const { getAlbums } = dataAlbum;
  const { getPublications } = dataPublication || null;

  const addAlbumModal = () => {
    setTitleModal(INPUT_ALBUM_NAME);
    setChildrenModal(
      <AlbumForm setShowModal={setShowModal} refetchAlbum={refetchAlbum} />
    );
    setShowModal(true);
  };

  const handleAlbumSelect = (id) => {
    setAlbumSelected(true);
    setIdAlbumSelected(id);
    refetchPublication();
  };

  const ButtonBack = () => {
    return (
      <Icon
        className="icons"
        link
        name="arrow alternate circle left outline"
        size="large"
        color="blue"
        onClick={() => setAlbumSelected(false)}
      />
    );
  };

  const ButtonAddPicture = () => {
    return (
      <Icon
        className="icons"
        link
        name="cloud upload"
        size="large"
        color="blue"
      />
    );
  };

  const getCols = () => (width > 600 ? 4 : 1);

  const ButtonAddAlbum = () => {
    return (
      <div className="album__addButton" onClick={() => addAlbumModal()}>
        <Icon link name="plus" size="big" color="blue" />
        <p>{ADD_ALBUM}</p>
      </div>
    );
  };

  return (
    <div className="album">
      {size(getAlbums) > 0 ? (
        <React.Fragment>
          {albumSelected && (
            <div className="album__goBack">
              <ButtonBack /> {isAlbum && <ButtonAddPicture />}{" "}
            </div>
          )}
          {!albumSelected ? (
            <>
              {isAlbum && <ButtonAddAlbum />}
              <Grid columns={getCols()}>
                {map(getAlbums, (album, index) => (
                  <Grid.Column key={index}>
                    <AlbumPreview
                      album={album}
                      isAlbum={isAlbum}
                      refetchAlbum={refetchAlbum}
                      handleAlbumSelect={handleAlbumSelect}
                    />
                  </Grid.Column>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {getPublications && size(getPublications) > 0 ? (
                <Grid columns={getCols}>
                  {map(getPublications, (publication, index) => (
                    <Grid.Column key={index}>
                      <PreviewPublication publication={publication} />
                    </Grid.Column>
                  ))}
                </Grid>
              ) : (
                <div>{EMPTY_ALBUM}</div>
              )}
            </>
          )}
        </React.Fragment>
      ) : (
        <div>{NOT_ALBUM_FOUND}</div>
      )}
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </div>
  );
}
