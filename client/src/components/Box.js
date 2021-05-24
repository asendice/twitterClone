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
} from "semantic-ui-react";
import { convertMili, readableDate } from "../utils/Helper";
import {
  getUsers,
  addLikeUser,
  addLikeBox,
  delLikeUser,
  delLikeBox,
  selectUser,
} from "../actions";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Box = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [index] = useState(0);

  // creates ids object that contains userId and the box or "post" id.
  // checks if the loggedin user is in the box's "likes" array
  // passes ids object to the appropriate action creator 

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

  // filters throgugh allUsers and returns an array of users that match userId from props
  const users = props.allUsers.filter((user) => {
    if (user._id === props.userId) {
      return user;
    } else {
      return null;
    }
  });
  //maps through the users array and returns just the users's name 
  const name = users.map((name) => {
    return name.name;
  });
  //maps through the users array and retuns just the profilePic
  const profilePic = users.map((name) => {
    return name.profilePic;
  });
  const postDate = new Date(props.time).toString();

  //renders out more detailed information about the post or "box" date/time/likes/comments
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
      return props.likes.includes(props.selectedUser._id) && props.profile ? (
        <span className="reply-text">
          {props.selectedUser.name} liked this post:{" "}
        </span>
      ) : (
        ""
      );
    }
  };
  const renderSuggestion = () => {
    if (props.suggestion) {
      return <span className="reply-text"> Suggested from following: </span>;
    }
  };

  const renderCommentMsg = () => {
    return props.reply ? (
      <span className="reply-text">
        Replying to <span>{props.reply}</span>
      </span>
    ) : (
      ""
    );
  };

  const renderReplyMsg = (name) => {
    return <span className="reply-text">{`Replying to ${name}`}</span>;
  };

  const renderAccordion = () => {
    if (props.replyIds && props.replyIds.length > 0) {
      return (
        <Accordion>
          <Accordion.Title
            onClick={() => accordionClick()}
            index={index}
            active={activeIndex === 0}
            icon={
              <Icon
                style={{ color: "#4da8da" }}
                name={activeIndex === 0 ? "arrow up" : "arrow down"}
              />
            }
            content={
              <span style={{ color: "#4da8da" }}>
                {activeIndex === 0 ? `Viewing Replies` : "View Replies"}
              </span>
            }
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={renderReplies()}
          />
        </Accordion>
      );
    }
  };

  const renderReplies = () => {
    const currentReplies = props.replies.filter((reply) => {
      return reply.commentId === props.id;
    });
    if (currentReplies.length > 0) {
      return currentReplies.map((reply) => {
        console.log("reply", reply)
        const userName = props.allUsers.filter((user) => {
          if (user._id === reply.userId) {
            return user;
          } else {
            return null;
          }
        });
        const commentUserName = props.allUsers.filter((user) => {
          if (user._id === props.userId) {
            return user;
          } else {
            return null;
          }
        });
        const commentName = commentUserName.map((name) => {
          return name.name;
        });
        const name = userName.map((name) => {
          return name.name;
        });
        const profilePic = userName.map((name) => {
          return name.profilePic;
        });
        if (currentReplies)
          return (
            <Segment
              key={reply._id}
              style={{
                background: "#203647",
                maxWidth: 650,
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid black",
              }}
            >
              {renderReplyMsg(commentName)}
              <Card
                key={reply._id}
                fluid
                style={{
                  background: "#203647",
                  boxShadow: "none",
                }}
              >
                <Header
                  as="h3"
                  style={{ display: "flex" }}
                  onClick={() => props.selectUser(userName[0])}
                >
                  {" "}
                  <object>
                    <Link
                      to={`/profile/${name}`}
                      style={{
                        display: "flex",
                        pointerEvents: "visible",
                        padding: 0,
                        margin: 0,
                        maxWidth: 60,
                      }}
                    >
                      <Image
                        circular
                        src={`${profilePic}`}
                        style={{
                          minWidth: 60,
                          minHeight: 60,
                          maxHeight: 60,
                          maxWidth: 60,
                        }}
                      />{" "}
                    </Link>
                  </object>
                  <object style={{ marginTop: "15px", marginLeft: "5px" }}>
                    <Link
                      to={`/profile/${name}`}
                      style={{ pointerEvents: "visible" }}
                    >
                      <span className="follow-seg">{name}</span>
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
                    </Link>
                  </object>
                </Header>
                <Feed.Content>
                  <span
                    style={{
                      color: "#fff",
                      overflowWrap: "anywhere",
                      fontSize: "20px",
                    }}
                  >
                    {reply.content}
                  </span>
                </Feed.Content>
              </Card>
            </Segment>
          );
      });
    }
  };

  const accordionClick = () => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };


  return (
    <>
      <Link
        to={`/comment/${props.link}`}
        className={props.disabled ? "disabled-link" : ""}
      >
        <Segment style={{ padding: 0 }} basic>
          {renderLikeMsg()}
          {renderSuggestion()}
          {renderCommentMsg()}
          <Card
            key={props.id}
            fluid
            style={{
              background: "#203647",
              boxShadow: "none",
            }}
          >
            {/* */}

            <Header
              as="h3"
              style={{ display: "flex" }}
              onClick={() => props.selectUser(users[0])}
            >
              {" "}
              <object>
                <Link
                  to={`/profile/${name}`}
                  style={{
                    display: "flex",
                    pointerEvents: "visible",
                    padding: 0,
                    margin: 0,
                    maxWidth: 60,
                  }}
                >
                  <Image
                    circular
                    src={`${profilePic}`}
                    style={{
                      minWidth: 60,
                      minHeight: 60,
                      maxHeight: 60,
                      maxWidth: 60,
                    }}
                  />{" "}
                </Link>
              </object>
              <object style={{ marginTop: "15px", marginLeft: "5px" }}>
                <Link
                  to={`/profile/${name}`}
                  style={{ pointerEvents: "visible" }}
                >
                  <span className="follow-seg">{name}</span>
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
                </Link>
              </object>
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
      </Link>

      {renderBoxInfo()}
      <Feed.Meta>
        <Grid>
          <Grid.Row columns={2} textAlign="center">
            <Grid.Column>
              <button
                className="box-btn-heart"
                style={{ display: `${props.heartDisplay}` }}
              >
                <Icon
                  onClick={() => onHeartClick()}
                  size="large"
                  color={
                    props.likes.includes(props.userInfo._id) ? "red" : "grey"
                  }
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
                style={{ display: `${props.commentDisplay}` }}
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
      {renderAccordion()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    userInfo: state.userInfo.user,
    allUsers: state.allUsers.users,
    selectedUser: state.selectedUser,
    selectedBox: state.selectedBox,
    replies: state.replies.replies,
    selectedComment: state.selectedComment,
    comments: state.comment.comments,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addLikeUser: (ids) => addLikeUser(ids),
  addLikeBox: (ids) => addLikeBox(ids),
  delLikeUser: (ids) => delLikeUser(ids),
  delLikeBox: (ids) => delLikeBox(ids),
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
