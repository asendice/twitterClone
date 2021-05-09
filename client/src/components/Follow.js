import React from "react";
import { Segment, Tab } from "semantic-ui-react";

const Follow = () => {
  const renderFollowers = () => {
    return(
      <div>renderFollowers</div>
    )
  };

  const renderFollowing = () => {
    return(
      <div>renderFollowing</div>
    )
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
    <Segment style={{ height: "50vh", background: "#203647",  }}>

      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Segment>
  );
};

export default Follow;
