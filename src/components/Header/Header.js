import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, Container } from "semantic-ui-react";
import Logo from "../../assets/Littleamsterdam.png";
import Search from "../Header/Search";
import Menu from "../Header/Menu";
import {MOBILE_RES} from "../../utils/constants"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import "./Header.scss";

export default function Header() {
  const {width} = useWindowDimensions();
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link to="/social">
              <Image src={Logo} alt="LittleAmsterdam" />
            </Link>
          </Grid.Column>
          <Grid.Column width={width <MOBILE_RES ? 9 : 9}>
            <Search />
          </Grid.Column>
          <Grid.Column width={width < MOBILE_RES ? 4 : 4}>
            <div className="header__menu">
              <Menu />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}