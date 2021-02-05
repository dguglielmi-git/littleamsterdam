import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/circleAmsterdam.png";
import Menu from "../Header/Menu";
import Search from "../Header/Search";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Grid>
        <Grid.Column width={3} className="header__logo">
          <Link to="/">
            <Image src={Logo} />
          </Link>
        </Grid.Column>
        <Grid.Column width={8}>
          <Search />
        </Grid.Column>
        <Grid.Column width={5} className="header__menu">
          <Menu />
        </Grid.Column>
      </Grid>
    </div>
  );
}
