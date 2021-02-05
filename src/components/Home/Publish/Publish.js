import React from "react";
import { Image } from "semantic-ui-react";
import ImageNotFound from "../../../assets/notLogin.png";
import Actions from "../../Actions";
//import Action from "../../Modal/ModalPublication/Actions2";
import CommentForm from "../../CommentForm";
import "./Publish.scss";

export default function Publish() {
  return (
    <div className="publish">
      <div className="publish__box">
        <div className="publish__box-title">
          <Image avatar src={ImageNotFound} />
          <span>dguglielmi</span>
        </div>
        <div
          className="publish__box-photo"
          style={{
            backgroundImage: `url("https://www.lugaresdenieve.com/sites/default/files/styles/imagenes_ancho_total/public/imagenes-reportajes/snowboard_0.jpg?itok=teKySB7f"`,
          }}
        ></div>
        <div className="publish__box-actions">
        {/*  <Action /> */        }
        </div>
        <div className="publish__box-comments">
          <CommentForm />
        </div>
      </div>
    </div>
  );
}
