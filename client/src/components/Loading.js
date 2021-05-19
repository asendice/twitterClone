import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <Segment basic>
      <Loader active size="small"></Loader>{" "}
    </Segment>
  );
};

export default Loading;
