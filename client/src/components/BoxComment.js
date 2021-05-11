import React, { useState, useEffect } from "react";
import Box from "./Box";
import { connect } from "react-redux";
import uuid from "react-uuid";
import CommentForm from "./CommentForm";
import {
  postComment,
  getComments,
  putComment,
  getUsers,
  selectBox,
  getBox,
  getReplies,
  selectComment,
  addReplyToComment,
  postReply,
} from "../actions";
import { Segment, Modal, Divider, Icon, Accordion } from "semantic-ui-react";

const BoxComment = (props) => {
  const [open, setOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  const url = window.location.pathname.slice(9);
  if (!props.selectedBox.likes) {
    props.getBox(url);
  }
  useEffect(() => {
    // setActiveIndex(1);
    props.getComments(url);
    props.getReplies(props.selectedBox._id);
    props.getUsers();
  }, [url, open, replyOpen, props.selectedComment]);

  const user = props.allUsers.filter((item) => {
    const name = item.id === props.selectedBox.userId ? item : null;
    return name;
  });

  const mappedName = user.map((item) => {
    return item.name;
  });
  const numOfLikes = props.selectedBox.likes
    ? props.selectedBox.likes.length
    : 0;
  const numOfComments = props.comments ? props.comments.length : null;

  const sorted = props.comments.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  // console.log(currentReplies, "currentReplies");

  const renderCommentFeed = () => {
    if (props.comments.length > 0) {
      return sorted.map((comment) => {
        const date = new Date();
        const postDate = new Date(comment.createdAt);
        const commentAgo = date - postDate;
        return (
          <Segment
            onClick={() => props.selectComment(comment)}
            key={comment.id}
            style={{
              background: "#203647",
              minWidth: 420,
              maxWidth: 650,
              marginLeft: "auto",
              marginRight: "auto",
              border: "1px solid black",
            }}
          >
            <Box
              noLink={true}
              replyIds={comment.replies}
              id={comment.id}
              comments="none"
              likes={comment.likes}
              reply={mappedName}
              userId={comment.userId}
              content={comment.content}
              numOfComments={comment.replies.length}
              time={comment.createdAt}
              ago={commentAgo}
              setOpen={setReplyOpen}
              display="none"
              currentUserId={props.userInfo._id}
            />
          </Segment>
        );
      });
    } else {
      return (
        <Segment
          basic
          style={{
            background: "#203647",
            minWidth: 420,
            maxWidth: 650,
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid black",
          }}
        >
          <a onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
            Add a comment?{" "}
          </a>
        </Segment>
      );
    }
  };

  const onFormSubmit = (values) => {
    const comment = {
      id: uuid(),
      content: values.content,
      userId: props.userInfo._id,
      boxId: props.selectedBox._id,
    };
    const putComment = {
      id: uuid(),
      boxId: props.selectedBox._id,
    };
    props.postComment(comment);
    props.putComment(putComment);
    setOpen(false);
  };

  const onCommentFormSubmit = (values) => {
    const reply = {
      id: uuid(),
      content: values.content,
      boxId: props.selectedBox._id,
      userId: props.userInfo._id,
      commentId: props.selectedComment.id,
    };
    const item = {
      replyId: uuid(),
      commentId: props.selectedComment.id,
    };
    props.postReply(reply);
    props.addReplyToComment(item);
    setReplyOpen(false);
  };

  const date = new Date();
  const postDate = new Date(props.selectedBox.createdAt);
  const postAgo = date - postDate;

  const renderModal = () => {
    if (props.selectedBox.likes) {
      return (
        <Modal
          centered={false}
          size="tiny"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Content style={{ backgroundColor: "#203647" }}>
            <Icon
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer", color: "#4DA8DA" }}
              name="x"
              size="large"
            />
            <Divider />
            <Box
              likes={props.selectedBox.likes}
              id={props.selectedBox.id}
              userId={props.selectedBox.userId}
              content={props.selectedBox.content}
              comments={props.selectedBox.comments}
              time={props.selectedBox.createdAt}
              ago={postAgo}
              display="none"
              currentUserId={props.userInfo._id}
            />
            <Divider />
            <span
              style={{ marginLeft: "20px", color: "#4da8da" }}
            >{`Replying to ${mappedName}`}</span>
            <CommentForm onFormSubmit={onFormSubmit} />
          </Modal.Content>
        </Modal>
      );
    }
  };
  const renderCommentModal = () => {
    if (props.selectedComment) {
      const userName = props.allUsers.filter((user) => {
        if (user.id === props.selectedComment.userId) {
          return user;
        }
      });

      const name = userName.map((name) => {
        return name.name;
      });
      return (
        <Modal
          centered={false}
          size="tiny"
          onClose={() => setReplyOpen(false)}
          onOpen={() => setReplyOpen(true)}
          open={replyOpen}
        >
          <Modal.Content style={{ backgroundColor: "#203647" }}>
            <Icon
              onClick={() => setReplyOpen(false)}
              style={{ cursor: "pointer", color: "#4DA8DA" }}
              name="x"
              size="large"
            />
            <Divider />
            <Box
              likes={props.selectedComment.likes}
              id={props.selectedComment.id}
              userId={props.selectedComment.userId}
              content={props.selectedComment.content}
              time={props.selectedComment.createdAt}
              ago={postAgo}
              display="none"
              currentUserId={props.userInfo._id}
            />
            <Divider />
            <span
              style={{ marginLeft: "20px", color: "#4da8da" }}
            >{`Replying to ${name}`}</span>
            <CommentForm onFormSubmit={onCommentFormSubmit} />
          </Modal.Content>
        </Modal>
      );
    }
  };

  if (props.selectedBox.likes) {
    return (
      <>
        <Segment basic padded className="focus-box">
          <Box
            link={props._id}
            likes={props.selectedBox.likes}
            id={props.selectedBox._id}
            userId={props.selectedBox.userId}
            content={props.selectedBox.content}
            comments={props.selectedBox.comments}
            time={props.selectedBox.createdAt}
            ago={postAgo}
            numOfLikes={numOfLikes}
            numOfComments={numOfComments}
            setOpen={setOpen}
            currentUserId={props.userInfo._id}
            info={true}
          />
        </Segment>
        {renderCommentFeed()}
        {renderModal()}
        {renderCommentModal()}
      </>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    selectedBox: state.selectedBox,
    selectedComment: state.selectedComment,
    comments: state.comment.comments,
    userInfo: state.userInfo.user.data.result,
    loggedIn: state.userInfo.loggedIn,
    allUsers: state.allUsers.users,
    selectedUser: state.selectedUser,
    replies: state.replies.replies,
  };
};

const mapDispatchToProps = {
  addReplyToComment: (item) => addReplyToComment(item),
  getReplies: (boxId) => getReplies(boxId),
  postReply: (reply) => postReply(reply),
  getBox: (id) => getBox(id),
  postComment: (comment) => postComment(comment),
  getComments: (id) => getComments(id),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
  selectBox: (box) => selectBox(box),
  selectComment: (comment) => selectComment(comment),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxComment);
