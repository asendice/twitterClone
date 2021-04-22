import React, { useState } from "react";
import mage from "../images/mage.png";
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

const ProfileBox = () => {
  const [open, setOpen] = useState(false);

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
        <Modal.Content style={{backgroundColor: "#203647"}}>
          <Segment basic >
            <SettingsForm onFormSubmit={onFormSubmit} setOpen={setOpen}/>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <Segment
      as="div"
      textAlign="center"
      padded
      style={{
        minWidth: 420,
        minHeight: 250,
        cursor: "pointer",
        backgroundColor: "#203647"
      }}
    >
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image circular size="small" src={mage} />
            <Header as="h1" style={{ color: "#fff" }}>
              @userName
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button
              style={{ marginTop: 175, marginLeft: 35 }}
              className="follow-btn"
            >
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

export default ProfileBox;
