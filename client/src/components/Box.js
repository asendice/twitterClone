import React, { useState } from "react";
import {
  Feed,
  Image,
  Icon,
  Grid,
  Header,
  Card,
  Segment,
  Divider,
  Accordion,
  Label,
} from "semantic-ui-react";
import { convertMili, readableDate } from "../utils/Helper";
import {
  getUsers,
  addLikeUser,
  addLikeBox,
  delLikeUser,
  delLikeBox,
  getReplies,
} from "../actions";
import { connect } from "react-redux";

const Box = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [index] = useState(0);
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
  const postDate = new Date(props.time).toString();

  const renderBoxInfo = () => {
    if (props.info) {
      return (
        <>
          <span
            style={{
              color: "grey",
              fontSize: "15px",
              fontWeight: "normal",
              marginLeft: 12,
              fontSize: 14,
            }}
          >
            {readableDate(postDate)}
          </span>
          <Divider />
          <span style={{ color: "#fff", marginLeft: 10 }}>
            {props.numOfLikes}{" "}
          </span>
          <span style={{ color: "grey", marginLeft: 3 }}> Likes</span>
          <span style={{ color: "#fff", marginLeft: 10 }}>
            {props.numOfComments}{" "}
          </span>
          <span style={{ color: "grey", marginLeft: 3 }}> Comments</span>
          <Divider />
        </>
      );
    }
  };

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

  const renderReplyMsg = () => {
    return props.reply ? (
      <span className="reply-text">
        Replying to <span>{props.reply}</span>
      </span>
    ) : (
      ""
    );
  };

  return (
    <>
      <Segment
        style={{ padding: 0 }}
        basic
        href={props.noLink ? "" : `http://localhost:3000/comment/${props.link}`}
      >
        {renderLikeMsg()}
        {renderReplyMsg()}
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
              circular
              href={`http://localhost:3000/profile/${name}`}
              src={`http://localhost:8000/${profilePic}`}
              style={{
                minWidth: 60,
                minHeight: 60,
                maxHeight: 60,
                maxWidth: 60,
              }}
            />{" "}
            <a href={`http://localhost:3000/profile/${name}`}>
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
              {convertMili(props.ago)}
            </span>
          </Header>
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
      {renderBoxInfo()}
      <Feed.Meta>
        <Grid>
          <Grid.Row columns={2} textAlign="center">
            <Grid.Column>
              <button
                className="box-btn-heart"
                style={{ display: `${props.display}` }}
              >
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
                    visibility:
                      props.numOfLikes === 0 || props.info ? "hidden" : " ",
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
                    visibility:
                      props.numOfComments === 0 || props.info ? "hidden" : "",
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
    replies: state.replies.replies,
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
