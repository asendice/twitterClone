import React from "react";
import { Segment, Header } from "semantic-ui-react";

const Notifications = () => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ minWidth: 420, minHeight: 250, background: "#203647", margin: "auto" }}
      >
        <Header as="h3" style={{ color: "#fff" }}>
          Notifications currently unavailable.
        </Header>
      </Segment>
    </>
  );
};

export default Notifications;
