import React, { createRef } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BoxComment from "./BoxComment";
import Home from "./Home";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Title from "./Title";
import LeftMenu from "./LeftMenu";
import RightContent from "./RightContent";
import { Grid, Divider } from "semantic-ui-react";

const Main = () => {
  const contextRef = createRef();

  return (
    <div
      ref={contextRef}
      style={{ backgroundColor: "#12232e", minHeight: "100vh" }}
    >

        <Title contextRef={contextRef} />
        <Divider hidden />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column computer={5} tablet={2} mobile={2}>
              <LeftMenu contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={11} mobile={14}>
              <Route  path="/main/home" component={Home} />
              <Route  path="/main/notifications" component={Notifications} />
              <Route  path="/main/profile" component={Profile} />
              <Route  path="/main/comment" component={BoxComment} />
            </Grid.Column>
            <Grid.Column computer={5} tablet={1}>
              <RightContent contextRef={contextRef} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

    </div>
  );
};

export default Main;
