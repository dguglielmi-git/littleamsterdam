import React from "react";
import { map } from "lodash";
import AlbumList from "../Album/AlbumList";
import { Grid, Tab } from "semantic-ui-react";
import PreviewPublication from "./PreviewPublication";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./Publications.scss";

export default function Publications(props) {
  const { getPublications } = props;
  const { width } = useWindowDimensions();

  const getCols = () => (width > 600 ? 4 : 1);

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
        <Grid columns={getCols()}>
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
