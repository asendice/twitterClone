import React, { useState, useEffect } from "react";
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
      selectedUserId: props.selectedUser.id,
    };
    if (
      props.userInfo.following.includes(props.selectedUser.Id) &&
      props.selectedUser.followers.includes(props.userInfo._id)
    ) {
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

  return (
    <Segment
      textAlign="center"
      className="profile-box"
      padded
      style={{
        backgroundImage: `url('${`http://localhost:8000/${props.selectedUser.background}`}')`,
        backgroundSize: "655px 350px, cover",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
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
              }}
              src={`http://localhost:8000/${props.selectedUser.profilePic}`}
            />
            <Header as="h1" style={{ color: "#fff" }}>
              {props.selectedUser.name}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment basic style={{ float: "right" }}>
              {props.userInfo._id === props.selectedUser.id ? (
                <Icon
                  onClick={() => setOpen(true)}
                  size="large"
                  name="setting"
                  style={{ color: "#4DA8DA" }}
                />
              ) : (
                <Button
                  onClick={() => onFollowBtnClick()}
                  style={{ marginLeft: 35 }}
                  className="follow-btn"
                  content={
                    props.userInfo.following.includes(props.selectedUser.Id)
                      ? "Unfollow"
                      : "Follow"
                  }
                />
              )}
            </Segment>
            <Segment basic style={{ marginTop: 150, color: "#fff" }}>
              {props.selectedUser.bio}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <h4 style={{ color: "#fff" }}>
              Followers {"-"}{" "}
              {props.selectedUser.followers ? props.selectedUser.followers.length : "0"}
            </h4>
          </Grid.Column>
          <Grid.Column>
            <h4 style={{ color: "#fff" }}>
              Following{"-"}{" "}
              {props.selectedUser.following ? props.selectedUser.following.length : "0"}{" "}
            </h4>
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
  editProfilePic: (item) => editProfilePic(item),
  editBackground: (item) => editBackground(item),
  editBio: (item) => editBio(item),
  addFollower: (item) => addFollower(item),
  addFollowing: (item) => addFollowing(item),
  delFollower: (item) => delFollower(item),
  delFollowing: (item) => delFollowing(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
