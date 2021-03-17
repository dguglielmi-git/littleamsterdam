import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import { COUNT_ALBUM } from "../../../../gql/album";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Followers(props) {
  const { username, totalPublications, idUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });

  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWEDS, {
    variables: { username },
  });

  const { data: dataCountAlbum, loading: loadingCountAlbum } = useQuery(
    COUNT_ALBUM,
    {
      variables: { idUser },
    }
  );

  /*
  // Uncomment this fragment in order to check the number of followers in real time
  // It will be continuing checking out against the server if there is an update (high cost on performance)
  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  useEffect(() => {
    startPollingFolloweds(1000);
    return () => {
      stopPollingFolloweds();
    };
  }, [startPollingFolloweds, stopPollingFolloweds]);
*/
  const openFollowers = () => {
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const openFolloweds = () => {
    setTitleModal("Seguidos");
    setChildrenModal(
      <ListUsers users={getFolloweds} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  // Evitamos que se acceda al data.getFollowers antes que se haya cargado
  if (loadingFollowers || loadingFolloweds || loadingCountAlbum) return null;
  const { getFollowers } = dataFollowers;
  const { getFolloweds } = dataFolloweds;
  const { countAlbums } = dataCountAlbum;

  return (
    <React.Fragment>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> Publicaciones
        </p>
        <p>
          <span>{countAlbums}</span> {countAlbums > 1 ? "Albumes" : "Album"}
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> Seguidores
        </p>
        <p className="link" onClick={openFolloweds}>
          <span>{size(getFolloweds)}</span> Seguidos
        </p>
        <p className="link">
          <span>0</span> Bloqueados
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </React.Fragment>
  );
}
