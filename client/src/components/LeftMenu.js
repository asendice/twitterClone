import React, { useState } from "react";
import scary from "../images/scary.jpeg";
import {
  Menu,
  Image,
  Header,
  Modal,
  Segment,
  Icon,
  Sticky,
  Button,
  Divider,
  Grid,
} from "semantic-ui-react";
import PostBoxForm from "./PostBoxForm";
import { postBoxes } from "../actions";
import { connect } from "react-redux";

const LeftMenu = (props) => {
  const [open, setOpen] = useState(false);

  const onFormSubmit = (values) => {
    const box = {
      userId: "1",
      content: values.boxText,
    };
    props.postBoxes(box);
    setOpen(false);
  };
  const renderModal = () => {
    return (
      <Modal
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>
          <Icon
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            name="x"
          />
        </Modal.Header>
        <Modal.Content>
          <PostBoxForm onFormSubmit={onFormSubmit} />
        </Modal.Content>
      </Modal>
    );
  };

  const onPostClick = () => {
    setOpen(true);
  };

  return (
    <Sticky context={props.contextRef} offset={66}>
      <Grid className="computer only">
        <Menu
          vertical
          borderless
          style={{
            boxShadow: "none",
            border: "none",
            background: "#203647",
            marginLeft: 50,
            marginTop: 60,
            width: "20rem",
          }}
        >
          <Header as="h1" style={{ color: "#fff" }}>
            <Image circular src={scary} />
            @userName
          </Header>
          <Divider hidden />
          <Divider hidden />
          <Menu.Item>
            <Header as="h2" style={{ color: "#fff" }}>
              <Icon name="home" />
              Home
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header as="h2" style={{ color: "#fff" }}>
              <Icon name="bell" />
              Notifications
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header as="h2" style={{ color: "#fff" }}>
              <Icon name="user" />
              Profile
            </Header>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Button
              onClick={onPostClick}
              style={{ backgroundColor: "#4DA8DA" }}
            >
              <Header as="h2" style={{ color: "#fff" }}>
                Post
              </Header>
            </Button>
          </Menu.Item>
        </Menu>
      </Grid>

      <Grid className="tablet only">
        <Menu
          compact
          vertical
          borderless
          style={{
            boxShadow: "none",
            border: "none",
            background: "#203647",
            maxWidth: "10px",
          }}
        >
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="at" />
            </Header>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="home" />
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="bell" />
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="user" />
            </Header>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Segment basic style={{ right: 20 }}>
              <Button onClick={onPostClick} style={{ backgroundColor: "#4DA8DA", color: "#fff" }}>
                P
              </Button>
            </Segment>
          </Menu.Item>
        </Menu>
      </Grid>

      <Grid className="mobile only">
        <Menu
          className="mobileMenu"
          vertical
          borderless
          compact
          style={{
            boxShadow: "none",
            border: "none",
            background: "#203647",
            maxWidth: "10px",
          }}
        >
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="at" />
            </Header>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="home" />
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="bell" />
            </Header>
          </Menu.Item>
          <Menu.Item>
            <Header style={{ color: "#fff" }}>
              <Icon size="big" name="user" />
            </Header>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Segment basic style={{ right: 22 }}>
              <Button onClick={onPostClick} style={{ backgroundColor: "#4DA8DA", color: "#fff" }}>
                P
              </Button>
            </Segment>
          </Menu.Item>
        </Menu>
      </Grid>
      {renderModal()}
    </Sticky>
  );
};

const mapStateToProps = (state) => {
  return {
    box: state.box,
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
