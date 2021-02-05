import React from "react";
import { Icon, Button, Label } from "semantic-ui-react";
import FuckImage from "../../assets/fuckyou.png";
import "./Actions.scss";

export default function Actions() {
  return (
    <div className="actions">
      <div className="actions__icons">
        <Button as="div" labelPosition="right">
          <Button color="blue">
            <Icon name="thumbs up outline" />
            Me gusta
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            2,048
          </Label>
        </Button>

        <Button as="div" labelPosition="right">
          <Button color="red">
            <Icon name="thumbs down outline" />
            No me gusta
          </Button>
          <Label as="a" basic color="red" pointing="left">
            2,048
          </Label>
        </Button>

        <Button as="div" labelPosition="right">
          <Button color="green">
            <Icon name="trash alternate outline" />
            Me chupa un huevo
          </Button>
          <Label as="a" basic color="green" pointing="left">
            2,048
          </Label>
        </Button>
      </div>
      <div>
        <span>Esta es una foto que le chupa un huevo a mucha gente...</span>
      </div>
    </div>
  );
}
