import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ImageNotFound from "../../../assets/notLogin.png";
import "./Menu.scss";
import Dropdown from "./Dropdown";

export default function Menu() {
  const { auth } = useAuth();
  return (
    <React.Fragment>
      <div className="menu">
        <Link to={`${auth.username}`}>
          <Image src={ImageNotFound} avatar />
        </Link>
        <Dropdown />
      </div>
    </React.Fragment>
  );
}
