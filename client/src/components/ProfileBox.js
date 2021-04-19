import React from "react";
import scary from "../images/scary.jpeg";
import { Segment, Grid, Image, Header } from "semantic-ui-react";

const ProfileBox = () => {
  return (
    <Segment
      textAlign="center"
      padded
      style={{ minWidth: 420, minHeight: 250, background: "#12232e" }}
    >
      <Grid>
        <Grid.Row>
          <Image circular size="small" src={scary} />
          <Header as="h1" style={{ color: "#fff" }}>
            @userName
          </Header>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <h4 style={{ color: "#fff" }}>Followers {"-"} 0</h4>
          </Grid.Column>
          <Grid.Column>
            <h4 style={{ color: "#fff" }}>Following{"-"}0 </h4>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ProfileBox;
