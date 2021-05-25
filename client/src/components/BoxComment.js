import React, { useState, useEffect } from "react";
import Box from "./Box";
import Loading from "./Loading";
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
import { Segment, Modal, Divider, Icon } from "semantic-ui-react";

const BoxComment = (props) => {
  const [open, setOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  const url = window.location.pathname.slice(9);
  if (!props.selectedBox.likes) {
    props.getBox(url);
  }
  useEffect(() => {
    if (props.selectedBox) {
      props.getReplies(props.selectedBox._id);
    }
    props.getComments(url);
    props.getUsers();
  }, [url]);

  const user = props.allUsers.filter((item) => {
    const name = item._id === props.selectedBox.userId ? item : null;
    return name;
  });

  const mappedName = user.map((item) => {
    return item.name;
  });
  const numOfLikes = props.selectedBox.likes
    ? props.selectedBox.likes.length
    : 0;
  const numOfComments = props.selectedBox.comments
    ? props.selectedBox.comments.length
    : null;

  const sorted = props.comments.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  const renderCommentFeed = () => {
    if (props.commentsLoading) {
      return <Loading />;
    }
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
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              border: "1px solid black",
            }}
          >
            <Box
              box="comment"
              suggestion={false}
              noLink={true}
              link={props.selectedBox._id}
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
              heartDisplay="none"
              currentUserId={props.userInfo._id}
              disabled={true}
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
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid black",
          }}
        >
          <span
            onClick={() => setOpen(true)}
            className="add-a-comment"
          >
            Add a comment?{" "}
          </span>
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
              suggestion={false}
              id={props.selectedBox.id}
              userId={props.selectedBox.userId}
              content={props.selectedBox.content}
              comments={props.selectedBox.comments}
              time={props.selectedBox.createdAt}
              ago={postAgo}
              heartDisplay="none"
              commentDisplay="none"
              currentUserId={props.userInfo._id}
              disabled={true}
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
        if (user._id === props.selectedComment.userId) {
          return user;
        } else {
          return null;
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
              suggestion={false}
              reply={props.selectedComment.name}
              id={props.selectedComment.id}
              userId={props.selectedComment.userId}
              content={props.selectedComment.content}
              time={props.selectedComment.createdAt}
              ago={postAgo}
              heartDisplay="none"
              commentDisplay="none"
              currentUserId={props.userInfo._id}
              disabled={true}
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
            link={props.selectedBox._id}
            likes={props.selectedBox.likes}
            suggestion={false}
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
            disabled={true}
          />
        </Segment>
        {renderCommentFeed()}
        {renderModal()}
        {renderCommentModal()}
      </>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    selectedBox: state.selectedBox,
    selectedComment: state.selectedComment,
    comments: state.comment.comments,
    commentsLoading: state.comment.isLoading,
    userInfo: state.userInfo.user,
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
