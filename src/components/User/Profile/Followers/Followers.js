import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Followers(props) {
  const { username, totalPublications } = props;
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

  /*
  // Uncomment this fragment if you want to be checking the number of followers in real time
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
  if (loadingFollowers || loadingFolloweds) return null;
  const { getFollowers } = dataFollowers;
  const { getFolloweds } = dataFolloweds;

  return (
    <React.Fragment>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> publicaciones
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> seguidores
        </p>
        <p className="link" onClick={openFolloweds}>
          <span>{size(getFolloweds)}</span> seguidos
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </React.Fragment>
  );
}
