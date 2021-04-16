import React from "react";
import { Segment, Header, Sticky } from "semantic-ui-react";

const Title = (props) => {
  return (
    <Sticky context={props.contextRef}>
      <Segment textAlign="center" style={{ backgroundColor: "#007CC7" }}>
        <Header style={{ color: "#fff" }}>twitterClone</Header>
      </Segment>
    </Sticky>
  );
};

export default Title;
