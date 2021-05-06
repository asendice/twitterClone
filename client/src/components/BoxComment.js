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
} from "../actions";
import { Segment, Modal, Divider, Icon } from "semantic-ui-react";

const BoxComment = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getBox(window.location.pathname.slice(14));
    props.getComments(props.selectedBox._id);
    props.getUsers();
  }, []);

  const user = props.allUsers.filter((item) => {
    const name = item.id === props.selectedBox.userId ? item : null;
    return name;
  });

  const mappedName = user.map((item) => {
    return item.name;
  });
  const numOfLikes =
    props.selectedBox ? props.selectedBox.likes.length : 0;
  const numOfComments = props.comments ? props.comments.length : null;

  const renderCommentFeed = () => {
    if (props.comments.length > 0) {
      return props.comments.map((comment) => {
        const date = new Date();
        const postDate = new Date(comment.createdAt);
        const commentAgo = date - postDate;
        return (
          <Segment
            key={comment.id}
            style={{ background: "#203647", minWidth: 420 }}
          >
            <Box
              id={comment.id}
              comments="none"
              likes={comment.likes}
              reply={mappedName}
              userId={comment.userId}
              content={comment.content}
              time={comment.createdAt}
              ago={commentAgo}
              setOpen={setOpen}
              display="none"
              currentUserId={props.userInfo._id}
            />
          </Segment>
        );
      });
    } else {
      return (
        <Segment basic className="box-feed-item">
          <a onClick={() => setOpen(true)}>Add a comment? </a>
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

  const renderModal = () => {
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
            ago={props.selectedBox.createdAt}
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
  };

  return (
    <>
      <Segment
        basic
        padded
        style={{ minWidth: 420, minHeight: 50, background: "#203647" }}
      >
        <Box
          link={props.selectedBox._id}
          likes={props.selectedBox.likes}
          id={props.selectedBox._id}
          userId={props.selectedBox.userId}
          content={props.selectedBox.content}
          comments={props.selectedBox.comments}
          time={props.selectedBox.createdAt}
          ago={props.selectedBox.createdAt}
          numOfLikes={numOfLikes}
          numOfComments={numOfComments}
          setOpen={setOpen}
          currentUserId={props.userInfo._id}
        />
      </Segment>
      {renderCommentFeed()}
      {renderModal()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    selectedBox: state.selectedBox,
    comments: state.comment.comments,
    userInfo: state.userInfo.user.data.result,
    loggedIn: state.userInfo.loggedIn,
    allUsers: state.allUsers.users,
    selectedUser: state.selectedUser,
  };
};

const mapDispatchToProps = {
  getBox: (id) => getBox(id),
  postComment: (comment) => postComment(comment),
  getComments: (id) => getComments(id),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
  selectBox: (box) => selectBox(box),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxComment);
