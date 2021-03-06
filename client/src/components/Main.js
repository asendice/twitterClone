import React, { useRef, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import BoxComment from "./BoxComment";
import Home from "./Home";
import Landing from "./Landing";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Title from "./Title";
import LeftMenu from "./LeftMenu";
import RightContent from "./RightContent";
import { Grid, Divider } from "semantic-ui-react";
import { selectUser, updateIndex } from "../actions";
import { connect } from "react-redux";

const Main = (props) => {
  const contextRef = useRef();
  const name = window.location.pathname.slice(9);

  // on initial render and whenever props.numOfBoxes has changed
  // window on scroll event checks if the bottom of the page has been reached
  // if it has pass index to updateIndex action creator
  useEffect(() => {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        let index = {
          firstIndex: props.numOfBoxes,
          secondIndex: props.numOfBoxes + 25,
        };
        props.updateIndex(index);
      }
    };
  }, [props.numOfBoxes]);

  // prevents the ability to see twitterClone content without being loggedin 
  if (window.location.pathname === "/" && props.loggedIn) {
    return <Redirect to="/home" />;
  }

  if (props.loggedIn) {
    return (
      <div
        ref={contextRef}
        style={{ backgroundColor: "#12232e", minHeight: "100vh", overflow: "hidden"}}
      >
        <Title contextRef={contextRef} />
        <Divider hidden />
        <Grid columns={3} centered>
          <Grid.Row>
            <Grid.Column computer={5} tablet={2} mobile={2}>
              <LeftMenu contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={11} mobile={14}>
              <Route
                exact
                path="/home"
                render={() => <Home contextRef={contextRef} />}
              />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path={`/profile/${name}`} component={Profile} />
              <Route exact path={`/comment/${name}`} component={BoxComment} />
            </Grid.Column>
            <Grid.Column computer={5} tablet={1} mobile={0}>
              <RightContent contextRef={contextRef} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  } else {
    return (
      <>
        <Route exact path="/" component={Landing} />
        <Redirect to="/" />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    selectedUser: state.selectedUser,
    selectedBox: state.selectedBox,
    numOfBoxes: state.box.boxes.length,
  };
};

const mapDispatchToProps = {
  selectUser: (user) => selectUser(user),
  updateIndex: (index) => updateIndex(index),
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
