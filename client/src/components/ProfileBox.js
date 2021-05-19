import React, { useState, useEffect } from "react";
import SettingsForm from "./SettingsForm";
import { justDate } from "../utils/Helper";
import {
  Segment,
  Grid,
  Menu,
  Image,
  Header,
  Button,
  Tab,
  Table,
  Divider,
  Modal,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getUser,
  editProfilePic,
  editBackground,
  editBio,
  addFollower,
  addFollowing,
  delFollower,
  delFollowing,
  getUsers,
} from "../actions";

const ProfileBox = (props) => {
  const [open, setOpen] = useState(false);
  const [followOpen, setFollowOpen] = useState(false);
  useEffect(() => {
    props.getUser(window.location.pathname.slice(9));
    props.getUsers();
  }, [open, followOpen, window.location.pathname]);

  const currentSelectedUser = props.allUsers.filter(
    (user) => user._id === props.selectedUser._id
  )[0];

  const postDate = new Date(props.selectedUser.createdAt).toString();

  const onFormSubmit = (values) => {
    if (values.profilePic) {
      const items = {
        id: props.userInfo._id,
        profilePic: values.profilePic,
      };
      props.editProfilePic(items);
    }
    if (values.background) {
      const items = {
        id: props.userInfo._id,
        background: values.background,
      };
      props.editBackground(items);
    }

    if (values.bio) {
      const items = {
        id: props.userInfo._id,
        bio: values.bio,
      };
      props.editBio(items);
    }
    setOpen(false);
    props.getUsers();
  };

  const onFollowBtnClick = () => {
    const item = {
      currentUserId: props.userInfo._id,
      selectedUserId: props.selectedUser._id,
    };

    if (props.currentUser.following.includes(props.selectedUser._id)) {
      props.delFollower(item);
      props.delFollowing(item);
    } else {
      props.addFollower(item);
      props.addFollowing(item);
    }
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
  const renderFollowModal = () => {
    if (props.selectedUser.followers || props.selectedUser.following) {
      const followers = props.allUsers.filter((user) => {
        if (user.following.includes(props.selectedUser._id)) {
          return user;
        }
      });
      const following = props.allUsers.filter((user) => {
        if (user.followers.includes(props.selectedUser._id)) {
          return user;
        }
      });

      const onFollowBtnClickFromModal = (follower) => {
        const item = {
          currentUserId: props.userInfo._id,
          selectedUserId: follower._id,
        };
        if (follower.followers.includes(props.userInfo._id)) {
          props.delFollower(item);
          props.delFollowing(item);
        } else {
          props.addFollower(item);
          props.addFollowing(item);
        }
      };

      const followerContent = () => {
        return followers.map((follower) => {
          return (
            <Table.Row key={follower._id}>
              <Table.Cell>
                <a href={`/profile/${follower.name}`}>
                  <Image
                    style={{
                      maxWidth: 80,
                      minHeight: 80,
                      minWidth: 80,
                      maxHeight: 80,
                    }}
                    circular
                    src={`http://localhost:8000/${follower.profilePic}`}
                  />
                </a>
              </Table.Cell>
              <Table.Cell>
                <a href={`/profile/${follower.name}`}>
                  <Header as="h3" style={{ color: "#fff" }}>
                    {follower.name}
                  </Header>
                </a>
                <p style={{ color: "grey" }}>{follower.bio}</p>
              </Table.Cell>
              <Table.Cell>
                {follower._id === props.userInfo._id ? (
                  ""
                ) : follower.followers.includes(props.userInfo._id) ? (
                  <Button
                    content="Following"
                    circular
                    className="edit-profile-btn"
                    onClick={() => onFollowBtnClickFromModal(follower)}
                  />
                ) : (
                  <Button
                    content="Follow"
                    circular
                    className="follow-btn"
                    onClick={() => onFollowBtnClickFromModal(follower)}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          );
        });
      };

      const followingContent = () => {
        return following.map((follower) => {
          return (
            <Table.Row key={follower._id}>
              <Table.Cell>
                <a href={`/profile/${follower.name}`}>
                  <Image
                    style={{
                      maxWidth: 80,
                      minHeight: 80,
                      minWidth: 80,
                      maxHeight: 80,
                    }}
                    circular
                    src={`http://localhost:8000/${follower.profilePic}`}
                  />
                </a>
              </Table.Cell>
              <Table.Cell>
                <a href={`/profile/${follower.name}`}>
                  <Header as="h3" style={{ color: "#fff" }}>
                    {follower.name}
                  </Header>
                </a>
                <p style={{ color: "grey" }}>{follower.bio}</p>
              </Table.Cell>
              <Table.Cell>
                {follower._id === props.userInfo._id ? (
                  ""
                ) : follower.followers.includes(props.userInfo._id) ? (
                  <Button
                    fluid
                    content="Following"
                    circular
                    className="edit-profile-btn"
                    onClick={() => onFollowBtnClickFromModal(follower)}
                  />
                ) : (
                  <Button
                    fluid
                    content="Follow"
                    circular
                    className="follow-btn"
                    onClick={() => onFollowBtnClickFromModal(follower)}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          );
        });
      };

      const panes = [
        {
          menuItem: (
            <Menu.Item key={123}>
              <span style={{ color: "#fff" }}>Followers</span>
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane
              style={{
                background: "#203647",
                border: "none",
                boxShadow: "none",
              }}
              attached={false}
              content={
                <Table
                  unstackable
                  style={{
                    background: "#203647",
                    maxHeight: 500,
                    border: "none",
                  }}
                >
                  <Table.Body>{followerContent()}</Table.Body>
                </Table>
              }
            />
          ),
        },
        {
          menuItem: (
            <Menu.Item key={1234}>
              <span style={{ color: "#fff" }}>Following</span>
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane
              style={{
                background: "#203647",
                border: "none",
                boxShadow: "none",
              }}
              attached={false}
              content={
                <Table
                  unstackable
                  style={{
                    background: "#203647",
                    border: "none",
                    maxHeight: 500,
                  }}
                >
                  <Table.Body>{followingContent()}</Table.Body>
                </Table>
              }
            />
          ),
        },
      ];
      return (
        <Modal
          centered={false}
          size="small"
          onClose={() => setFollowOpen(false)}
          onOpen={() => setFollowOpen(true)}
          open={followOpen}
          style={{ maxWidth: 600 }}
        >
          <Modal.Content style={{ backgroundColor: "#203647", minHeight: 600 }}>
            <Segment basic style={{ display: "flex" }}>
              <Image
                style={{
                  maxWidth: 80,
                  minHeight: 80,
                  minWidth: 80,
                  maxHeight: 80,
                  margin: "auto",
                  marginRight: 5,
                }}
                circular
                src={`http://localhost:8000/${props.selectedUser.profilePic}`}
              />
              <Header
                as="h2"
                style={{ color: "#fff", margin: "auto", marginLeft: 5 }}
              >
                {props.selectedUser.name}
              </Header>
            </Segment>
            <Divider />
            <Tab
              menu={{
                secondary: true,
                pointing: true,
                grid: { paneWidth: 12, tabWidth: 6 },
              }}
              panes={panes}
            />
          </Modal.Content>
        </Modal>
      );
    }
  };

  return (
    <>
      <Segment
        style={{
          backgroundColor: "black",
          minWidth: "420px",
          maxWidth: 650,
          margin: "auto",
          marginBottom: "10px",
        }}
      >
        <Segment
          textAlign="center"
          className="profile-box"
          style={{
            backgroundImage: `url('${`http://localhost:8000/${props.selectedUser.background}`}')`,
            backgroundSize: "600px 350px, cover",
          }}
        >
          {renderModal()}
          {renderFollowModal()}
        </Segment>
        <Segment basic>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  circular
                  size="small"
                  style={{
                    maxHeight: 150,
                    maxWidth: 150,
                    minHeight: 150,
                    minWidth: 150,
                    border: "3px black solid",
                    top: -125,
                  }}
                  src={`http://localhost:8000/${props.selectedUser.profilePic}`}
                />
                <Header as="h1" style={{ color: "#fff", marginTop: -120 }}>
                  {props.selectedUser.name}
                </Header>
                <Segment basic style={{ color: "#fff", padding: 0 }}>
                  {props.selectedUser.bio}
                </Segment>
                <Divider />
                <span style={{ color: "grey" }}>
                  {" "}
                  <Icon color="grey" name="calendar outline" />
                  Joined,{" "}
                  {justDate(new Date(props.selectedUser.createdAt).toString())}
                </span>
                <Divider />
                <Segment
                  onClick={() => setFollowOpen(true)}
                  basic
                  style={{ padding: 0, cursor: "pointer" }}
                >
                  <span style={{ color: "#fff" }}>
                    {currentSelectedUser
                      ? currentSelectedUser.followers.length
                      : "0"}
                  </span>
                  <span style={{ color: "grey" }}> Followers</span>
                  <span style={{ color: "#fff", marginLeft: 15 }}>
                    {" "}
                    {props.selectedUser && currentSelectedUser
                      ? currentSelectedUser.following.length
                      : "0"}{" "}
                  </span>

                  <span style={{ color: "grey" }}> Following</span>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment basic style={{ float: "right" }}>
                  {props.userInfo._id === props.selectedUser._id ? (
                    <Button
                      circular
                      className="edit-profile-btn"
                      onClick={() => setOpen(true)}
                      size="small"
                      content="Edit Profile"
                    />
                  ) : currentSelectedUser &&
                    currentSelectedUser.followers.includes(
                      props.userInfo._id
                    ) ? (
                    <Button
                      content="Following"
                      circular
                      className="edit-profile-btn"
                      style={{ marginLeft: 35 }}
                      onClick={() => onFollowBtnClick()}
                    />
                  ) : (
                    <Button
                      content="Follow"
                      circular
                      className="follow-btn"
                      style={{ marginLeft: 35 }}
                      onClick={() => onFollowBtnClick()}
                    />
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    selectedUser: state.selectedUser,
    allUsers: state.allUsers.users,
    currentUser: state.allUsers.users.filter(
      (user) => user._id === state.userInfo.user._id
    )[0],
  };
};

const mapDispatchToProps = {
  getUser: (name) => getUser(name),
  getUsers: () => getUsers(),
  editProfilePic: (item) => editProfilePic(item),
  editBackground: (item) => editBackground(item),
  editBio: (item) => editBio(item),
  addFollower: (item) => addFollower(item),
  addFollowing: (item) => addFollowing(item),
  delFollower: (item) => delFollower(item),
  delFollowing: (item) => delFollowing(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
