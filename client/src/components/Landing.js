import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  Segment,
  Message,
  Header,
  Button,
  Modal,
  Divider,
} from "semantic-ui-react";
import { Redirect } from "react-router";
import { login, register } from "../actions";
import { connect } from "react-redux";

const Landing = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

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

  const renderLoginResults = () => {
    const mapUserInfoError = props.error.map((errors) => {
      return errors.user || errors.password;
    });
    return (
      <>
        <Message style={{ background: "#12232e" }}>
          <Message.Header style={{ color: "pink" }}>
            Login Failed:{" "}
          </Message.Header>
          <p style={{ color: "pink" }}>{mapUserInfoError}</p>
        </Message>
        <Divider hidden />
      </>
    );
  };
  const renderRegisterResults = () => {
    if (props.regError) {
      const mapUserInfoError = props.regError.map((errors) => {
        return errors.user || errors.password;
      });
      return (
        <>
          <Message style={{ background: "#12232e" }}>
            <Message.Header style={{ color: "pink" }}>
              Registration Failed:{" "}
            </Message.Header>
            <p style={{ color: "pink" }}>{mapUserInfoError}</p>
          </Message>
          <Divider hidden />
        </>
      );
    }
    if (props.registerInfo.status === 200) {
      return (
        <>
          <Message style={{ background: "#12232e" }}>
            <Message.Header style={{ color: "#fff" }}>
              Registration Successful:{" "}
              <span
                style={{ color: "#4da8da", cursor: "pointer" }}
                onClick={() => regLinkClick()}
              >
                Login
              </span>
            </Message.Header>
          </Message>
          <Divider hidden />
        </>
      );
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
            {props.error ? renderLoginResults() : ""}
            <LoginForm onLogIn={onLogIn} />
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
          {props.regError || props.registerInfo.status
            ? renderRegisterResults()
            : ""}
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
      <Segment
        padded="very"
        style={{
          maxWidth: "600px",
          backgroundColor: "black",
          margin: "auto",
          marginTop: "100px",
          border: "2px solid black",
        }}
      >
        <Header
          className="landing-header-blue"
          as="h1"
        >
          It's
        </Header>
        <Header
          className="landing-header-white"
          as="h1"
        >
          Happening
        </Header>
        <Header
          className="landing-header-blue"
          as="h1"
        >
          Now.
        </Header>
        <Header as="h2" style={{ color: "#fff" }}>
          Join <span style={{ color: "#4da8da" }}>twitterClone</span> Today.
        </Header>
        <Button
          fluid
          circular
          className="follow-btn"
          onClick={() => setRegisterOpen(true)}
        >
          Register
        </Button>
        <Button
          fluid
          circular
          className="edit-profile-btn"
          onClick={() => setLoginOpen(true)}
          style={{
            marginTop: 10,
          }}
        >
          Login
        </Button>
      </Segment>
      {renderLoginModal()}
      {renderRegisterModal()}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userInfo.loggedIn,
    registerInfo: state.registerInfo,
    userInfo: state.userInfo,
    error: state.userInfo.result ? state.userInfo.result.data.errors : null,
    regError: state.registerInfo.data ? state.registerInfo.data.errors : null,
  };
};

const mapDispatchToProps = {
  login: (formValues) => login(formValues),
  register: (formValues) => register(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
