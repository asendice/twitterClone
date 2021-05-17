import React, { useState } from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import { Segment, Button } from "semantic-ui-react";
import FollowerFeed from "./FollowerFeed";

const Home = () => {
  const [value, setValue] = useState(true);

  const feedSelector = () => {
    return value ? <BoxFeed /> : <FollowerFeed />;
  };

  return (
    <Segment basic style={{ margin: "auto", padding: "0px" }}>
      <PostBox />
      <Button
        circular
        fluid
        onClick={() => setValue(!value)}
        className={value ? "follow-btn" : "edit-profile-btn"}
        content={value ? "Everyone" : "Following"}
        style={{ maxWidth: "650px", margin: "auto", minWidth: "420px" }}
      />
      {feedSelector()}
    </Segment>
  );
};

export default Home;
