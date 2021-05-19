import React from "react";
import { Segment, Header, Sticky } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

const Title = (props) => {
  return (
    <Sticky context={props.contextRef} offset={0}>
      <Segment textAlign="center" style={{ backgroundColor: "black" }}>
        <Link to="/home"><Header style={{ color: "#4da8da" }}>twitterClone</Header></Link>
      </Segment>
    </Sticky>
  );
};

export default Title;
