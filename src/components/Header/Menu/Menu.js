import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Tooltip } from "primereact/tooltip";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ImageNotFound from "../../../assets/notLogin.png";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import "./Menu.scss";
import ModalUpload from "../../Modal/ModalUpload";
import Dropdown from "./Dropdown";

export default function Menu() {
  const { auth, logout } = useAuth();
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_USER, {
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

  return (
    <React.Fragment>
      <div className="menu">
        {width > 500 ? (
          <React.Fragment>
            <Link to={`${auth.username}`}>
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
              />
            </div>
            <div classname="menu__button shutdown">
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
            <Dropdown />
          </div>
        )}
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </React.Fragment>
  );
}
