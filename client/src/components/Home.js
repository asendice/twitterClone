import React, { useState, useEffect } from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import { Segment, Button, Sticky, Divider } from "semantic-ui-react";
import FollowerFeed from "./FollowerFeed";
import { connect } from "react-redux";
import { selectUser } from "../actions";

const Home = (props) => {
  const [value, setValue] = useState(true);

  useEffect(() => {
    props.selectUser(props.userInfo);
  }, []);

  // if value is true render boxFeed else render FollowFeed 
  const feedSelector = () => {
    return value ? <BoxFeed /> : <FollowerFeed />;
  };

  // makes the botton a toggle from true to false, and brings user to top of page
  const onBtnClick = () => {
    setValue(!value);
    window.scrollTo(0, 0);
  };

  return (
    <Segment
      basic
      ref={props.pagContextRef}
      style={{ margin: "auto", padding: "0px" }}
    >
      <PostBox />
      <Sticky context={props.contextRef} offset={50}>
        <Button
          circular
          fluid
          onClick={() => onBtnClick()}
          className={"edit-profile-btn"}
          content={value ? "Everyone's Feed" : "Just Following"}
          style={{
            maxWidth: "600px",
            margin: "auto",
            marginBottom: "10px",
          }}
        />
      </Sticky>
      {feedSelector()}
      <Divider hidden />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    boxesLoading: state.box.isLoading,
    numOfBoxes: state.box.boxes.length,
    index: state.index,
  };
};

const mapDispatchToProps = {
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
