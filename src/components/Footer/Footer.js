import React from "react";
import { Button, Grid, Image } from "semantic-ui-react";
import LogoTransparent from "../../assets/LogoTransparent.png";
import "./Footer.scss";

export default function Footer() {
  return (
      <Grid className="footer">
        <Grid.Column width={8}>
          <Image src={LogoTransparent} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Button circular color="facebook" icon="facebook" />
          <a
            href="https://twitter.com/littleamsterda4?ref_src=twsrc%5Etfw"
            target="_blank"
          >
            <Button circular color="twitter" icon="twitter" />
          </a>
          <a
            href="https://www.instagram.com/littleamsterdamba/"
            target="_blank"
          >
            <Button circular color="instagram" icon="instagram" />
          </a>
        </Grid.Column>
      </Grid>
  );
}
