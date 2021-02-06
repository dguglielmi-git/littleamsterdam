import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutBasic(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <Header />
      <Container className="layout-basic">{children}</Container>
    </React.Fragment>
  );
}
