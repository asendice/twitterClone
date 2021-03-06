import React, { useEffect } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { selectUser } from "../actions/index";
import { connect } from "react-redux";

const Notifications = (props) => {
  useEffect(() => {
    props.selectUser(props.userInfo);
  }, []);
  return (
    <>
      <Segment
        textAlign="center"
        style={{
          background: "#203647",
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          border: "1px solid black",
        }}
      >
        <Header as="h3" style={{ color: "#fff" }}>
          Coming soon...
        </Header>
        <Icon size="massive" name="time" style={{ color: "#fff" }} />
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
  };
};

const mapDispatchToProps = {
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
