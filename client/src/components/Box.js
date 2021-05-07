import React from "react";
import {
  Feed,
  Image,
  Icon,
  Grid,
  Header,
  Card,
  Segment,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { convertMili } from "../utils/Helper";
import {
  getUsers,
  addLikeUser,
  addLikeBox,
  delLikeUser,
  delLikeBox,
} from "../actions";
import { connect } from "react-redux";

const Box = (props) => {
  console.log(props.time, "props.time");
  console.log(props.ago, "props.time");
  // console.log(props.likes, "props.likes");
  // console.log(props.selectedBox.likes, "props.selectedBox.likes");
  // creates ids object that contains user Id and the box or "post" id.
  // checks to see if the logged in user is in the box's "likes" array
  // passes ids object to the appropriate action creator depending on if the logged in user in that box's "likes" array
  const onHeartClick = () => {
    const ids = {
      userId: props.currentUserId,
      boxId: props.id,
    };

    if (props.likes.includes(props.userInfo._id)) {
      props.delLikeUser(ids);
      props.delLikeBox(ids);
    } else {
      props.addLikeUser(ids);
      props.addLikeBox(ids);
    }
  };

  const userName = props.allUsers.filter((user) => {
    if (user.id === props.userId) {
      return user;
    }
  });

  const name = userName.map((name) => {
    return name.name;
  });

  const profilePic = userName.map((name) => {
    return name.profilePic;
  });

  const renderLikeMsg = () => {
    if (props.likes) {
      return props.likes.includes(props.selectedUser.id) && props.profile ? (
        <span className="reply-text">
          {props.selectedUser.name} liked this post:{" "}
        </span>
      ) : (
        ""
      );
    }
  };

  return (
    <>
      <Segment
        style={{ padding: 0 }}
        basic
        as="a"
        href={`http://localhost:3000/main/comment/${props.link}`}
      >
        {renderLikeMsg()}
        <Card
          key={props.id}
          fluid
          style={{
            background: "#203647",
            boxShadow: "none",
          }}
        >
          {/* */}

          <Header as="h3">
            {" "}
            <Image
              href={`http://localhost:3000/main/profile/${name}`}
              avatar
              src={`http://localhost:8000/${profilePic}`}
              // style={{ height: "45px", width: "45px" }}
            />{" "}
            <a href={`http://localhost:3000/main/profile/${name}`}>
              <span style={{ color: "#EEFBFB" }}>{name}</span>
            </a>
            <span
              style={{
                color: "grey",
                fontSize: "15px",
                fontWeight: "normal",
              }}
            >
              {" - "}
              {props.ago > 0 ? convertMili(props.ago) : (props.time)}
            </span>
          </Header>
          {props.reply ? (
            <span style={{ marginLeft: "20px", color: "grey" }}>
              Replying to{" "}
              <span style={{ color: "#4da8da" }}>{props.reply}</span>
            </span>
          ) : (
            ""
          )}
          <Feed.Content>
            <span
              style={{
                color: "#fff",
                overflowWrap: "anywhere",
                fontSize: "20px",
              }}
            >
              {props.content}
            </span>
          </Feed.Content>
        </Card>
      </Segment>

      <Feed.Meta style={{ display: `${props.display}` }}>
        <Grid>
          <Grid.Row columns={2} textAlign="center">
            <Grid.Column>
              <button className="box-btn-heart">
                <Icon
                  onClick={() => onHeartClick()}
                  size="large"
                  color={props.likes.includes(props.userInfo._id) ? "red" : ""}
                  name={
                    props.likes.includes(props.userInfo._id)
                      ? "heart"
                      : "heart outline"
                  }
                />
                <span
                  style={{
                    marginLeft: "5px",
                    visibility: props.numOfLikes === 0 ? "hidden" : " ",
                    color: "grey",
                  }}
                >
                  {props.numOfLikes}
                </span>
              </button>
            </Grid.Column>
            <Grid.Column>
              <button
                onClick={() => props.setOpen(true)}
                className="box-btn-comment"
              >
                <Icon size="large" name="comment outline" />

                <span
                  style={{
                    marginLeft: "5px",
                    visibility: props.numOfComments === 0 ? "hidden" : "",
                    color: "grey",
                  }}
                >
                  {props.numOfComments}
                </span>
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Feed.Meta>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    userInfo: state.userInfo.user.data.result,
    allUsers: state.allUsers.users,
    selectedUser: state.selectedUser,
    selectedBox: state.selectedBox,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addLikeUser: (ids) => addLikeUser(ids),
  addLikeBox: (ids) => addLikeBox(ids),
  delLikeUser: (ids) => delLikeUser(ids),
  delLikeBox: (ids) => delLikeBox(ids),
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
