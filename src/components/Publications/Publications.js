import React, { useState } from "react";
import { Grid, Tab } from "semantic-ui-react";
import { map } from "lodash";
import PreviewPublication from "./PreviewPublication";
import AlbumList from "../Album/AlbumList";
import "./Publications.scss";

export default function Publications(props) {
  const { getPublications } = props;

  const panes = [
    {
      menuItem: "Publicaciones",
      render: () => showPublications(),
    },
    {
      menuItem: "Albumes",
      render: () => (
        <Tab.Pane attached={false}>
          <AlbumList />
        </Tab.Pane>
      ),
    },
  ];
  
  const showPublications = () => {
    return (
      <Tab.Pane attached={false}>
        <Grid columns={4}>
          {map(getPublications, (publication, index) => (
            <Grid.Column key={index}>
              <PreviewPublication publication={publication} />
            </Grid.Column>
          ))}
        </Grid>
      </Tab.Pane>
    );
  };

  return (
    <div className="publications">
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  );
}
