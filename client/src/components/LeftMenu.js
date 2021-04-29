import React, { useState } from "react";
import mage from "../images/mage.png";
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
import { logout } from "../actions";
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
        centered={false}
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content style={{ background: "#203647" }}>
          <Icon
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer", color: "#4DA8DA" }}
            name="x"
            size="large"
          />
          <Segment
            basic
            textAlign="center"
            padded
            style={{ minWidth: 420, background: "#203647" }}
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
    <Sticky context={props.contextRef} offset={100}>
      <Grid className="computer only">
        <Menu
          style={{ cursor: "pointer" }}
          className="left-menu media-left-menu"
          vertical
          borderless
        >
          <NavLink to="/main/profile">
            <Header as="h1" style={{ color: "#fff" }}>
              <Image circular src={mage} />
              {props.userInfo.name}
            </Header>
          </NavLink>
          <Divider hidden />
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              className="menu-item"
              to="/main/home"
              activeClassName="menu-item-active"
            >
              <Icon name="home" />
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-item"
              to="/main/notifications"
              activeClassName="menu-item-active"
            >
              <Icon name="bell" />
              Notifications
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-item"
              activeClassName="menu-item-active"
              to="/main/profile"
            >
              <Icon name="user" />
              Profile
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
          <Divider hidden />
          <Menu.Item>
            <Button
              onClick={() => props.logout()}
              style={{ backgroundColor: "grey" }}
            >
              <Header as="h2" style={{ color: "#fff" }}>
                Logout
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
            background: "#12232e",
            maxWidth: "10px",
            cursor: "pointer",
          }}
        >
          <Menu.Item>
            <NavLink className="menu-icon" to="/main/profile">
              <Icon size="big" name="at" />
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              to="/main/home"
              className="menu-icon"
              activeClassName="menu-item-active"
            >
              <Icon size="big" name="home" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/main/notifications"
            >
              <Icon size="big" name="bell" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/main/profile"
            >
              <Icon size="big" name="user" />
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
            background: "#12232e",
            maxWidth: "10px",
            cursor: "pointer",
          }}
        >
          <Menu.Item>
            <NavLink className="menu-icon" to="/main/profile">
              <Icon size="big" name="at" />
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/main/home"
            >
              <Icon size="big" name="home" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/main/notifications"
            >
              <Icon size="big" name="bell" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/main/profile"
            >
              <Icon size="big" name="user" />
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
    userInfo: state.userInfo.user.data.message,
    loggedIn: state.userInfo.loggedIn,
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
  logout: () => logout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
