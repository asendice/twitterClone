import React, { createRef } from "react";
import { Redirect, Route } from "react-router-dom";
import BoxComment from "./BoxComment";
import Home from "./Home";
import Landing from "./Landing";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Follow from "./Follow";
import Title from "./Title";
import LeftMenu from "./LeftMenu";
import RightContent from "./RightContent";
import { Grid, Divider } from "semantic-ui-react";
import { connect } from "react-redux";

const Main = (props) => {
  const contextRef = createRef();
  const name = window.location.pathname.slice(9);

  if (window.location.pathname === "/" && props.loggedIn) {
    return <Redirect to="/home" />;
  }

  if (props.loggedIn) {
    return (
      <div
        ref={contextRef}
        style={{ backgroundColor: "#12232e", minHeight: "100vh" }}
      >
        <Title contextRef={contextRef} />
        <Divider hidden />
        <Grid columns={3} centered>
          <Grid.Row>
            <Grid.Column computer={5} tablet={2} mobile={2}>
              <LeftMenu contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={11} mobile={12}>
              <Route exact path="/home" component={Home} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path={`/profile/${name}`} component={Profile} />
              <Route exact path={`/proflile/${name}/follow`} component={Follow} />
              <Route exact path={`/comment/${name}`} component={BoxComment} />
            </Grid.Column>
            <Grid.Column computer={5} tablet={1} mobile={2}>
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
  };
};

export default connect(mapStateToProps, null)(Main);
