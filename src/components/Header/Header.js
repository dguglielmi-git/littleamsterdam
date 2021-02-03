import React from "react";
import { Grid, Container, Image } from "semantic-ui-react";
import Logo from "../../assets/circleAmsterdam.png";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <Image src={Logo} />
          </Grid.Column>
          <Grid.Column width={10}>
            <h2>Buscador</h2>
          </Grid.Column>
          <Grid.Column width={3}>
            <h2>Iconos</h2>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
