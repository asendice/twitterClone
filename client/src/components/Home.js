import React from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import { Segment } from "semantic-ui-react";

const Home = () => {
  return (
    <Segment basic style={{ margin: "auto", padding: "0px"  }}>
      <PostBox />
      <BoxFeed />
    </Segment>
  );
};

export default Home;
