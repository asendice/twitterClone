import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Segment, Grid, Header, Button, Modal } from "semantic-ui-react";

const Landing = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const renderLoginModal = () => {
    return (
      <Modal
        centered={false}
        size="tiny"
        onClose={() => setLoginOpen(false)}
        onOpen={() => setLoginOpen(true)}
        open={loginOpen}
      >
        <Modal.Content style={{ backgroundColor: "#203647" }}>
          <Segment basic>
            <LoginForm />
          </Segment>
        </Modal.Content>
      </Modal>
    );
  };

  const renderRegisterModal = () => {
    return (
      <Modal
        centered={false}
        size="tiny"
        onClose={() => setRegisterOpen(false)}
        onOpen={() => setRegisterOpen(true)}
        open={registerOpen}
      >
        <Modal.Content style={{ backgroundColor: "#203647" }}>
          <Segment basic>
            <RegisterForm />
          </Segment>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <Segment fluid style={{ backgroundColor: "#12232e", height: "100vh" }}>
      <Grid columns={3}>
        <Grid.Column mobile={1} tablet={5} computer={6}></Grid.Column>
        <Grid.Column mobile={14} tablet={6} computer={6} style={{ top: 200 }}>
          <Segment basic>
            <Header as="h1" style={{ color: "#fff", fontSize: "4.5rem" }}>
              It's
            </Header>
            <Header as="h1" style={{ color: "#fff", fontSize: "4.5rem" }}>
              Happening
            </Header>
            <Header as="h1" style={{ color: "#fff", fontSize: "4.5rem" }}>
              Now.
            </Header>
            <Header as="h2" style={{ color: "#fff" }}>
              Join twitterClone Today.
            </Header>
          </Segment>
          <Segment basic style={{ maxWidth: "400px" }}>
            <Button
              fluid
              onClick={() => setRegisterOpen(true)}
              style={{ backgroundColor: "#4DA8DA", color: "#fff" }}
            >
              Register
            </Button>
            <Button
              fluid
              onClick={() => setLoginOpen(true)}
              style={{
                backgroundColor: "#12232e",
                border: "solid 1px #4DA8DA",
                marginTop: 10,
                color: "#fff",
              }}
            >
              Login
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={1} tablet={5} computer={6}></Grid.Column>
      </Grid>
      {renderLoginModal()}
      {renderRegisterModal()}
    </Segment>
  );
};

export default Landing;
