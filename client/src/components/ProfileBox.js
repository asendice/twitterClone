import React, { useState, useEffect } from "react";
import SettingsForm from "./SettingsForm";
import {
  Segment,
  Grid,
  Image,
  Header,
  Button,
  Tab,
  Table,
  Modal,
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
} from "../actions";

const ProfileBox = (props) => {
  const [open, setOpen] = useState(false);
  const [followOpen, setFollowOpen] = useState(false);

  useEffect(() => {
    props.getUser(window.location.pathname.slice(9));
  }, [open]);

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
  };

  const onFollowBtnClick = () => {
    const item = {
      currentUserId: props.userInfo._id,
      selectedUserId: props.selectedUser._id,
    };
    if (props.selectedUser.followers.includes(props.userInfo._id)) {
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
    // const followers = props.allUsers.map((user) => {
    //     if(props.selectedUser.followers.includes(user.id)) {
    //       return user;
    //     }

    // }
    if (props.selectedUser.followers || props.selectedUser.following) {
      const followers = props.allUsers.filter((user) => {
        if (props.selectedUser.followers.includes(user.id)) {
          return user;
        }
      });
      const following = props.allUsers.filter((user) => {
        if (props.selectedUser.following.includes(user.id)) {
          return user;
        }
      });

      console.log(followers, "followers");

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
              </Table.Cell>
              <Table.Cell>
                <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                  Follow
                </Button>
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
              </Table.Cell>
              <Table.Cell>
                <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                  Follow
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        });
      };

      const panes = [
        {
          menuItem: "Followers",
          render: () => (
            <Tab.Pane
              style={{ background: "#203647", border: "none" }}
              attached={false}
              content={
                <Table style={{ background: "#203647" }}>
                  <Table.Body>{followerContent()}</Table.Body>
                </Table>
              }
            />
          ),
        },
        {
          menuItem: "Following",
          render: () => (
            <Tab.Pane
              style={{ background: "#203647" , color: "#fff"}}
              attached={false}
              content={
                <Table style={{ background: "#203647" }}>
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
          style={{ maxWidth: 400 }}
        >
          <Modal.Content style={{ backgroundColor: "#203647" }}>
            <Tab menu={{ secondary: true, pointing: true, white: true, grid: { paneWidth: 12, tabWidth: 6 } }} panes={panes} />
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
                <Segment
                  onClick={() => setFollowOpen(true)}
                  basic
                  style={{ padding: 0, cursor: "pointer" }}
                >
                  <span style={{ color: "#fff" }}>
                    {props.selectedUser.followers
                      ? props.selectedUser.followers.length
                      : "0"}
                  </span>
                  <span style={{ color: "grey" }}> Followers</span>
                  <span style={{ color: "#fff", marginLeft: 15 }}>
                    {" "}
                    {props.selectedUser.following
                      ? props.selectedUser.following.length
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
                  ) : (
                    <Button
                      onClick={() => onFollowBtnClick()}
                      style={{ marginLeft: 35 }}
                      className="follow-btn"
                      content={
                        props.selectedUser.followers &&
                        props.selectedUser.followers.includes(
                          props.userInfo._id
                        )
                          ? "Unfollow"
                          : "Follow"
                      }
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
  };
};

const mapDispatchToProps = {
  getUser: (name) => getUser(name),
  editProfilePic: (item) => editProfilePic(item),
  editBackground: (item) => editBackground(item),
  editBio: (item) => editBio(item),
  addFollower: (item) => addFollower(item),
  addFollowing: (item) => addFollowing(item),
  delFollower: (item) => delFollower(item),
  delFollowing: (item) => delFollowing(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
