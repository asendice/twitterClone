import React from "react";
import { Segment, Header, Sticky } from "semantic-ui-react";

const Title = (props) => {
  return (
    <Sticky context={props.contextRef} offset={-8}>
      <Segment textAlign="center" style={{ backgroundColor: "black" }}>
        <Header style={{ color: "#fff" }}>twitterClone</Header>
      </Segment>
    </Sticky>
  );
};

export default Title;
