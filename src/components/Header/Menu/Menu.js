import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Tooltip } from "primereact/tooltip";
import { useHistory, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ImageNotFound from "../../../assets/notLogin.png";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import SettingsForm from "../../User/Profile/SettingsForm";
import ModalUpload from "../../Modal/ModalUpload";
import ModalBasic from "../../Modal/ModalBasic";
import Dropdown from "./Dropdown";
import "./Menu.scss";

export default function Menu() {
  const { auth, logout } = useAuth();
  const { width} = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const client = useApolloClient();
  const [showModalBasic, setShowModalBasic] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  const onLogout = () => {
    // Cleaning Apollo Client Cache
    client.clearStore();

    logout();
    history.push("/");
  };

  const handlerModal = (type) => {
    setTitleModal("");
    setChildrenModal(
      <SettingsForm
        setShowModalBasic={setShowModalBasic}
        setTitleModal={setTitleModal}
        setChildrenModal={setChildrenModal}
        getUser={getUser}
        refetch={refetch}
      />
    );
    setShowModalBasic(true);
  };

  return (
    <React.Fragment>
      <div className="menu">
        {width > 500 ? (
          <React.Fragment>
            <Link to={`/profile/${auth.username}`}>
              <Image
                src={getUser.avatar ? getUser.avatar : ImageNotFound}
                avatar
              />
            </Link>
            <div
              className="menu__button upload"
              data-pr-tooltip="Upload an Image"
            >
              <Tooltip target=".upload" position="bottom" />
              <Icon
                name="upload"
                size="large"
                color="blue"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="menu__button setting">
              <Tooltip target=".setting" position="bottom" />
              <Icon
                className="setting"
                data-pr-tooltip="Account Settings"
                name="setting"
                size="large"
                color="blue"
                onClick={() => handlerModal()}
              />
            </div>
            <div className="menu__button shutdown">
              <Tooltip target=".shutdown" position="bottom" />
              <Icon
                className="shutdown"
                data-pr-tooltip="Logoff"
                name="setting"
                size="large"
                color="blue"
                onClick={() => onLogout()}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className="burger">
            <Dropdown handlerModal={handlerModal}/>
          </div>
        )}
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
      <ModalBasic
        show={showModalBasic}
        setShow={setShowModalBasic}
        title={titleModal}
      >
        {childrenModal}
      </ModalBasic>
    </React.Fragment>
  );
}
