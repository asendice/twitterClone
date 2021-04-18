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
import { NavLink } from "react-router-dom";
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
        <Modal.Content style={{ background: "#12232e" }}>
          <Icon
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            name="x"
          />
          <Segment
            textAlign="center"
            very
            padded
            style={{ minWidth: 420, background: "#12232e" }}
          >
            <PostBoxForm onFormSubmit={onFormSubmit} />
            <Divider hidden />
          </Segment>
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
        <Menu className="left-menu media-left-menu" vertical borderless>
          <Header as="h1" style={{ color: "#fff" }}>
            <Image circular src={scary} />
            @userName
          </Header>
          <Divider hidden />
          <Divider hidden />
          <Menu.Item>
            <NavLink
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              <Header as="h2" style={{ color: "#fff" }}>
                <Icon name="home" />
                Home
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink activeClassName="is-active" to="/notifications" activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}>
              <Header as="h2" style={{ color: "#fff" }}>
                <Icon name="bell" />
                Notifications
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink activeClassName="is-active" to="/profile">
              <Header as="h2" style={{ color: "#fff" }}>
                <Icon name="user" />
                Profile
              </Header>
            </NavLink>
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
            <NavLink to="/">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="home" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/notifications">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="bell" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/profile">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="user" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Segment basic style={{ right: 20 }}>
              <Button
                onClick={onPostClick}
                style={{ backgroundColor: "#4DA8DA", color: "#fff" }}
              >
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
            <NavLink to="/">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="home" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/notifications">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="bell" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/profile">
              <Header style={{ color: "#fff" }}>
                <Icon size="big" name="user" />
              </Header>
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <Segment basic style={{ right: 22 }}>
              <Button
                onClick={onPostClick}
                style={{ backgroundColor: "#4DA8DA", color: "#fff" }}
              >
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
