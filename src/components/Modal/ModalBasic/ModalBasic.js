import React from "react";
import { Modal } from "semantic-ui-react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {MOBILE_RES} from "../../../utils/constants"
import "./ModalBasic.scss";

export default function ModalBasic(props) {
  const { show, setShow, title, children } = props;  
  const { width } = useWindowDimensions();

  const onClose = () => {
    setShow(false);
  };
  return (
    <Modal
      size="mini"
      open={show}
      onClose={onClose}
      className={width < MOBILE_RES ? "modal-basic-cell" : "modal-basic"}
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
}
