import React, { useState } from "react";
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
import { NavLink, Redirect } from "react-router-dom";
import PostBoxForm from "./PostBoxForm";
import { postBoxes, getUser } from "../actions";
import { logout } from "../actions";
import { connect } from "react-redux";

const LeftMenu = (props) => {
  const [open, setOpen] = useState(false);

  const onProfileClick = () => {
    props.getUser(props.userInfo.name);
  };

  const onFormSubmit = (values) => {
    const box = {
      userId: props.userInfo._id,
      content: values.boxText,
      likes: [],
      comments: [],
    };
    props.postBoxes(box);
    props.getUser(props.selectedUser._id);
    setOpen(false);
  };

  const logout = () => {
    props.logout();
    return <Redirect to="/login" />;
  };

  const updatedUser = props.allUsers.filter((users) => {
    if ((users.id === props.userInfo._id) || (users._id === props.userInfo._id)) {
      return users;
    }
  });

  const updatedUserPic = updatedUser.map((user) => {
    return user.profilePic;
  });


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
          <NavLink
            onClick={() => onProfileClick()}
            to={`/profile/${updatedUserPic}`}
          >
            <Header as="h1" style={{ color: "#fff" }}>
              <Image
                style={{
                  minWidth: 120,
                  minHeight: 120,
                  maxWidth: 120,
                  maxHeight: 120,
                }}
                circular
                src={`http://localhost:8000/${updatedUserPic}`}
              />
            </Header>
            <Header as="h1" style={{ color: "#fff" }}>
              {props.userInfo.name}
            </Header>
          </NavLink>
          <Divider hidden />
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              className="menu-item"
              to="/home"
              activeClassName="menu-item-active"
            >
              <Icon name="home" />
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-item"
              to="/notifications"
              activeClassName="menu-item-active"
            >
              <Icon name="bell" />
              Notifications
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              onClick={() => onProfileClick()}
              className="menu-item"
              activeClassName="menu-item-active"
              to={`/profile/${props.userInfo.name}`}
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
              onClick={() => logout()}
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
            <NavLink
              className="menu-icon"
              to={`/profile${props.selectedUser.name}`}
            >
              <Image
                style={{
                  minWidth: 50,
                  minHeight: 50,
                  maxHeight: 50,
                  maxWidth: 50,
                  right: "6px",
                }}
                circular
                src={`http://localhost:8000/${updatedUserPic}`}
              />
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              to="/home"
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
              to="/notifications"
            >
              <Icon size="big" name="bell" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to={`/profile/${props.userInfo.name}`}
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
            <NavLink
              className="menu-icon"
              to={`/profile/${props.userInfo.name}`}
            >
              <Image
                style={{
                  minWidth: 50,
                  minHeight: 50,
                  maxHeight: 50,
                  maxWidth: 50,
                  right: "6px",
                }}
                circular
                src={`http://localhost:8000/${updatedUserPic}`}
              />
            </NavLink>
          </Menu.Item>
          <Divider hidden />
          <Menu.Item>
            <NavLink
              exact
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/home"
            >
              <Icon size="big" name="home" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to="/notifications"
            >
              <Icon size="big" name="bell" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink
              className="menu-icon"
              activeClassName="menu-item-active"
              to={`/profile/${props.userInfo.name}`}
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
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    selectedUser: state.selectedUser,
    allUsers: state.allUsers.users,
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
  logout: () => logout(),
  getUser: (userId) => getUser(userId),
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
