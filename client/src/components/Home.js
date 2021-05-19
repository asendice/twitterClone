import React, { useState, useEffect, useRef } from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import { Segment, Button, Sticky } from "semantic-ui-react";
import FollowerFeed from "./FollowerFeed";
import { connect } from "react-redux";
import { selectUser } from "../actions";

const Home = (props) => {
  const [value, setValue] = useState(true);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(25);

  useEffect(() => {
    props.selectUser(props.userInfo);
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setSecondIndex(props.numOfBoxes + 25);
        console.log("at the bottom of the page");
      }
    };
  }, [props.numOfBoxes]);

  const feedSelector = () => {
    return value ? (
      <BoxFeed firstIndex={firstIndex} secondIndex={secondIndex} />
    ) : (
      <FollowerFeed firstIndex={firstIndex} secondIndex={secondIndex} />
    );
  };

  return (
    <Segment
      basic
      ref={props.pagContextRef}
      style={{ margin: "auto", padding: "0px" }}
    >
      <PostBox />
      <Sticky context={props.contextRef} offset={40}>
        <Button
          circular
          fluid
          onClick={() => setValue(!value)}
          className={value ? "follow-btn" : "edit-profile-btn"}
          content={value ? "Everyone" : "Following"}
          style={{ maxWidth: "650px", margin: "auto", minWidth: "420px" }}
        />
      </Sticky>
      {feedSelector()}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    boxesLoading: state.box.isLoading,
    numOfBoxes: state.box.boxes.length,
  };
};

const mapDispatchToProps = {
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
