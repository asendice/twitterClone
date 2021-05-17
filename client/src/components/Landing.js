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
    setLoginResult(true);
  };

  const onRegister = (formValues) => {
    props.register(formValues);
  };

  console.log(loginResult, "loginResult");
  console.log(loginResult, "loginResult");

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

  const renderLoginResults = () => {
    const mapUserInfoError = props.userInfo.result.data.errors.map((errors) => {
      return errors.user || errors.password;
    });
    return <span style={{ color: "#fff" }}> Login failed: {mapUserInfoError}</span>;
  };

  console.log(props.error, "props.error")


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
            <LoginForm
              onLogIn={onLogIn}
              setLoginResult={setLoginResult}
              loginResult={loginResult}
            />
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
      <Segment
        padded="very"
        rounded
        style={{
          minWidth: "420px",
          maxWidth: "600px",
          backgroundColor: "black",
          margin: "auto",
          marginTop: "200px",
        }}
      >
        <Header as="h1" style={{ color: "#4da8da", fontSize: "4.5rem" }}>
          It's
        </Header>
        <Header as="h1" style={{ color: "#fff", fontSize: "4.5rem" }}>
          Happening
        </Header>
        <Header as="h1" style={{ color: "#4da8da", fontSize: "4.5rem" }}>
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
      {/* {props.registerInfo ? renderRegisterResultModal() : null} */}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userInfo.loggedIn,
    registerInfo: state.registerInfo,
    error: state.userInfo.result ? state.userInfo.result.data.errors : null,
  };
};

const mapDispatchToProps = {
  login: (formValues) => login(formValues),
  register: (formValues) => register(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
