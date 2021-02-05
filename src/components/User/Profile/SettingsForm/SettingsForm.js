import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../../PasswordForm";
import EmailForm from "../../EmailForm";
import DescriptionForm from "../../DescriptionForm";
import SiteWebForm from "../../SiteWebForm";
import useAuth from "../../../../hooks/useAuth";
import "./SettingsForm.scss";

export default function SettingsForm(props) {
  const {
    setShowModal,
    setTitleModal,
    setChildrenModal,
    getUser,
    refetch,
  } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { logout } = useAuth();

  const onChangePassword = () => {
    setTitleModal("Cambiar Contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar Email");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Cambiar Descripcion");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeSiteWeb = () => {
    setTitleModal("Cambiar Sitio Web");
    setChildrenModal(
      <SiteWebForm
        setShowModal={setShowModal}
        currentSiteWeb={getUser.siteWeb}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    // Limpia el store de Apollo Client
    client.clearStore();

    logout();
    history.push("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar Email</Button>
      <Button onClick={onChangeDescription}>Descripcion</Button>
      <Button onClick={onChangeSiteWeb}>Sitio Web</Button>
      <Button onClick={onLogout}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
