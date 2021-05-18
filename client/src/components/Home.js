import React, { useState, useEffect, useRef } from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import { Segment, Button, Sticky } from "semantic-ui-react";
import FollowerFeed from "./FollowerFeed";
import { connect } from "react-redux";
import { selectUser } from "../actions";

const Home = (props) => {
  const [value, setValue] = useState(true);
  const pagContextRef = useRef();

  useEffect(() => {
    props.selectUser(props.userInfo);
    console.log(props.contextRef);
    window.addEventListener("scroll", onScroll(), true);
  }, []);

  const feedSelector = () => {
    return value ? <BoxFeed /> : <FollowerFeed />;
  };
  const onScroll = () => {
    console.log("scrolling");
    console.log(pagContextRef);
    if (pagContextRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = pagContextRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  return (
    <Segment
      basic
      onScroll={() => onScroll()}
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
  };
};

const mapDispatchToProps = {
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
