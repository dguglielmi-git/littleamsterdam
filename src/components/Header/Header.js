import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, Container } from "semantic-ui-react";
import Logo from "../../assets/Littleamsterdam.png";
import Search from "../Header/Search";
import Menu from "../Header/Menu";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link to="/social">
              <Image src={Logo} alt="LittleAmsterdam" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <Search />
          </Grid.Column>
          <Grid.Column width={3}>
            <div className="header__menu">
              <Menu />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}