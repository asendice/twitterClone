import React, { useState, useEffect } from "react";
import tm from "../images/tm.jpeg";
import SettingsForm from "./SettingsForm";
import {
  Segment,
  Grid,
  Image,
  Header,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getUser } from "../actions";

const ProfileBox = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  console.log(window.location.pathname.slice(14));

  useEffect(() => {
    if (props.selectedUser.name === window.location.pathname.slice(14)) {
      console.log("SHOULD BE PROFILE ");
    } else {
      console.log("SENT MOTHER FUCKER ")
      setName(window.location.pathname.slice(14));
      props.getUser(name);
    }
  });

  console.log(name)

  const onFormSubmit = () => {
    return;
  };

  const renderModal = () => {
    return (
      <Modal
        centered={false}
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content style={{ backgroundColor: "#203647" }}>
          <Segment basic>
            <SettingsForm onFormSubmit={onFormSubmit} setOpen={setOpen} />
          </Segment>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <Segment
      textAlign="center"
      padded
      fluid
      style={{
        minWidth: 420,
        minHeight: 330,
        maxWidth: 650,
        cursor: "pointer",
        backgroundImage: `url('${tm}')`,
        backgroundSize: "655px 350px, cover",
      }}
    >
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image
              circular
              size="small"
              style={{
                minHeight: 150,
                minWidth: 150,
                border: "3px #203647 solid",
              }}
              src={`http://localhost:8000/${props.selectedUser.profilePic}`}
            />
            <Header as="h1" style={{ color: "#fff" }}>
              {props.selectedUser.name}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button style={{ marginLeft: 35 }} className="follow-btn">
              Follow
            </Button>
            <span style={{ float: "right" }}>
              <Icon
                onClick={() => setOpen(true)}
                size="large"
                name="setting"
                style={{ color: "#4DA8DA" }}
              />
            </span>
            <Segment basic style={{ marginTop: 150, color: "#fff" }}>
              {props.selectedUser.bio}
            </Segment>
          </Grid.Column>
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
      {renderModal()}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user.data.result,
    loggedIn: state.userInfo.loggedIn,
    selectedUser: state.selectedUser,
  };
};

const mapDispatchToProps = {
  getUser: (name) => getUser(name),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
