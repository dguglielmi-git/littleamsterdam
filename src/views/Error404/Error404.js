import React from "react";
import { Image } from "semantic-ui-react";
import Sadness from "../../assets/sadness.png";
import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error404">
      <Image src={Sadness} />
      <div>
        <h1>ERROR 404</h1>
        <h3>I think you tried to get the wrong page... Try again.</h3>
      </div>
    </div>
  );
}
