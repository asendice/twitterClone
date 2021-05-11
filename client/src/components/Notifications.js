import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

const Notifications = () => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{
          background: "#203647",
          minWidth: 420,
          maxWidth: 650,
          marginLeft: "auto",
          marginRight: "auto",
          border: "1px solid black",
        }}
      >
        <Header as="h3" style={{ color: "#fff" }}>
          Sorry... You don't have any notificaitons because the programmer
          decided to wait until version 2 to release them...
        </Header>
        <Icon size="massive" name="time" style={{ color: "#fff" }} />
      </Segment>
    </>
  );
};

export default Notifications;
