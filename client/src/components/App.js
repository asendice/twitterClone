import React, { createRef } from "react";
import PostBox from "./PostBox";
import BoxFeed from "./BoxFeed";
import Title from "./Title";
import LeftMenu from "./LeftMenu";
import WhoToFollow from "./WhoToFollow";
import { Grid, Divider } from "semantic-ui-react";

const App = () => {
  const contextRef = createRef();

  return (
    <div ref={contextRef} style={{ backgroundColor: "#203647" }}>
      <Title contextRef={contextRef} />
      <Divider hidden />
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column computer={5} tablet={2} mobile={2}>
            <LeftMenu contextRef={contextRef} />
          </Grid.Column>
          <Grid.Column computer={6} tablet={11} mobile={14}>
            <PostBox />
            <BoxFeed />
          </Grid.Column>
          <Grid.Column computer={5} tablet={1} >
            <WhoToFollow contextRef={contextRef}  />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
