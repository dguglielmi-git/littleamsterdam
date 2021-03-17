import React, { useState, useEffect } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import { useHistory, Redirect, useParams } from "react-router-dom";

const trigger = (
  <Icon name="bars" style={{ fontSize: "30px", marginTop: "5px" }} />
);

export default function DropdownMenu(props) {
  const { handlerModal } = props;
  const { auth, logout } = useAuth();
  const client = useApolloClient();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const { username } = useParams();

  const onLogout = () => {
    // Cleaning Apollo Client Cache
    client.clearStore();

    logout();
    history.push("/");
  };

  const goHome = () => setRedirect(!(username === auth.username));

  if (redirect) return <Redirect to={`${auth.username}`} />;

  return (
    <Dropdown trigger={trigger} pointing="top right" icon={null}>
      <Dropdown.Menu>
        <Dropdown.Item icon="user" text="Cuenta" onClick={() => goHome()} />
        <Dropdown.Item
          icon="settings"
          text="Ajustes"
          onClick={() => handlerModal()}
        />
        <Dropdown.Item
          icon="sign out"
          text="Cerrar Sesion"
          onClick={() => onLogout()}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
