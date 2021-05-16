import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Segment, Grid, Header, Button, Modal, Icon } from "semantic-ui-react";
import { Redirect } from "react-router";
import { login, register } from "../actions";
import { connect } from "react-redux";

const Landing = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginResult, setLoginResult] = useState(false);
  const [registerResult, setRegisterResult] = useState(false);
  if (props.loggedIn) {
    return <Redirect to="/home" />;
  }
  const logLinkClick = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  const regLinkClick = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const onLogIn = (formValues) => {
    props.login(formValues);
  };

  const onRegister = (formValues) => {
    props.register(formValues);
  };

  // const renderRegisterResultModal = () => {
  //   if (props.registerInfo.status === 200) {
  //     setLoginOpen(true);
  //   } else if (props.registerInfo.status === 200) {
  //     console.log("this should be working ---", props.registerInfo.status);
  //     const mapRegInfoError = props.registerInfo.data.errors.map((errors) => {
  //       return errors.user || errors.password;
  //     });
  //     return (
  //       <Modal
  //         centered={false}
  //         size="tiny"
  //         onClose={() => setRegisterResult(false)}
  //         onOpen={() => setRegisterResult(true)}
  //         open={registerResult}
  //       >
  //         <Modal.Content style={{ backgroundColor: "#203647" }}>
  //           <Segment basic style={{ color: "#fff" }}>
  //             {" "}
  //             Registration failed: {mapRegInfoError}
  //             <Icon
  //               onClick={() => setRegisterResult(false)}
  //               name="x"
  //               style={{ cursor: "pointer", color: "#4DA8DA", float: "right" }}
  //               name="x"
  //               size="large"
  //             />
  //           </Segment>
  //         </Modal.Content>
  //       </Modal>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const renderLoginResultModal = () => {
    if (props.loggedIn) {
      return <Redirect to="/home" />;
    } else if (!props.loggedIn) {
      const mapUserInfoError = props.userInfo.result.data.errors.map((errors) => {
        return errors.user || errors.password;
      });
      return (
        <Modal
          centered={false}
          size="tiny"
          onClose={() => setLoginResult(false)}
          onOpen={() => setLoginResult(true)}
          open={loginResult}
        >
          <Modal.Content style={{ backgroundColor: "#203647" }}>
            <Segment basic style={{ color: "#fff" }}>
              {" "}
              Login failed: {mapUserInfoError}
              <Icon
                onClick={() => setLoginResult(false)}
                name="x"
                style={{ cursor: "pointer", color: "#4DA8DA", float: "right" }}
                name="x"
                size="large"
              />
            </Segment>
          </Modal.Content>
        </Modal>
      );
    } else {
      return <Redirect to="/home" />;
    }
  };

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
            <LoginForm onLogIn={onLogIn} setLoginResult={setLoginResult} />
            <Segment basic textAlign="center">
              <span
                onClick={() => logLinkClick()}
                style={{ color: "#4DA8DA", cursor: "pointer" }}
              >
                Need An Account? | Register to twitterClone!
              </span>
            </Segment>
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
            <RegisterForm onRegister={onRegister} />
            <Segment basic textAlign="center">
              <span
                onClick={() => regLinkClick()}
                style={{ color: "#4DA8DA", cursor: "pointer" }}
              >
                Already Have An Account? | Login to twitterClone!
              </span>
            </Segment>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <Segment style={{ backgroundColor: "#12232e", height: "100vh" }}>
      <Grid columns={3}>
        <Grid.Column mobile={1} tablet={5} computer={6}></Grid.Column>
        <Grid.Column mobile={14} tablet={6} computer={6} style={{ top: 200 }}>
          <Segment basic style={{ minWidth: "400px", maxWidth: "400px" }}>
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
          <Segment basic style={{ minWidth: "400px", maxWidth: "400px" }}>
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
      {props.userInfo ? renderLoginResultModal() : null}
      {/* {props.registerInfo ? renderRegisterResultModal() : null} */}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    registerInfo: state.registerInfo,
  };
};

const mapDispatchToProps = {
  login: (formValues) => login(formValues),
  register: (formValues) => register(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
