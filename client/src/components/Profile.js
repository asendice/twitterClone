import React from "react";
import ProfileBox from "./ProfileBox";
import ProfileFeed from "./ProfileFeed";
import { Segment } from "semantic-ui-react";

const Profile = () => {
  return (
    <Segment compact basic style={{ margin: "auto", padding: "0px" }}>
      <ProfileBox />
      <ProfileFeed />
    </Segment>
  );
};

export default Profile;
