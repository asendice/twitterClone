import React from "react";
import { Segment, Tab } from "semantic-ui-react";

const Follow = (props) => {
  const renderFollowers = () => {
    if (props.selectedUser) {
      return props.selectedUser.followers.map((follower) => {
        return <span>{follower.name}</span>;
      });
    }
  };

  const renderFollowing = () => {
    if (props.selectedUser) {
      return props.selectedUser.following.map((following) => {
        return <span>{following.name}</span>;
      });
    }
  };

  const panes = [
    {
      menuItem: "Followers",
      render: () => <Tab.Pane attached={false}>{renderFollowers()}</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane attached={false}>{renderFollowing()}</Tab.Pane>,
    },
  ];

  return (
    <Segment style={{ height: "50vh", background: "#203647" }}>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Segment>
  );
};

export default Follow;
