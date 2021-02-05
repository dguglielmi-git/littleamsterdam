import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

const trigger = (
  <span>
    <Icon name="bars" style={{fontSize: "30px", marginTop: "5px"}} />
  </span>
);

const options = [
  { key: "user", text: "Cuenta", icon: "user" },
  { key: "settings", text: "Ajustes", icon: "settings" },
  { key: "sign-out", text: "Cerrar sesion", icon: "sign out" },
];

const DropdownImageTriggerExample = () => (
  <Dropdown
    trigger={trigger}
    options={options}
    pointing="top right"
    icon={null}
  />
);

export default DropdownImageTriggerExample;
