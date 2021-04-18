import React, { createRef } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Title from "./Title";
import LeftMenu from "./LeftMenu";
import RightContent from "./RightContent";
import { Grid, Divider } from "semantic-ui-react";

const App = () => {
  const contextRef = createRef();
  const searchRef = createRef();

  return (
    <div
      ref={contextRef}
      style={{ backgroundColor: "#203647", minHeight: "100vh" }}
    >
      <BrowserRouter>
        <Title contextRef={contextRef} />
        <Divider hidden />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column computer={5} tablet={2} mobile={2}>
              <LeftMenu contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={11} mobile={14}>
              <Route path="/" exact component={Home} />
              <Route path="/notifications" exact component={Notifications} />
              <Route path="/profile" exact component={Profile} />
            </Grid.Column>
            <Grid.Column computer={5} tablet={1}>
              <RightContent contextRef={contextRef} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default App;
