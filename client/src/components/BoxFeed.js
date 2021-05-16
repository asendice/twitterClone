import React, { useEffect, useState } from "react";
import Box from "./Box";
import { Modal, Segment, Divider, Icon } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import {
  getBoxes,
  selectBox,
  postComment,
  putComment,
  getUsers,
} from "../actions";
import uuid from "react-uuid";
import { connect } from "react-redux";

const BoxFeed = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getBoxes();
    props.getUsers();
  }, []);

  const sorted = props.boxes.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  const setSelectedBox = (box) => {
    props.selectBox(box);
  };

  const replyName = props.allUsers.filter((item) => {
    const name = item.id === props.selectedBox.userId ? item.name : null;
    return name;
  });
  const mappedName = replyName.map((item) => {
    return item.name;
  });
  const onFormSubmit = (values) => {
    const comment = {
      id: uuid(),
      content: values.content,
      userId: props.userInfo.data.result._id,
      boxId: props.selectedBox._id,
    };
    props.postComment(comment);
    props.putComment(comment);
    setOpen(false);
  };

  const renderModal = () => {
    const user = props.allUsers.filter((item) => {
      const name = item._id === props.selectedBox.userId ? item : null;
      return name;
    });
  
    const mappedName = user.map((item) => {
      return item.name;
    });
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
              id={props.selectedBox._id}
              likes={props.selectedBox.likes}
              comments={props.selectedBox.comments}
              userId={props.selectedBox.userId}
              content={props.selectedBox.content}
              time={props.selectedBox.createdAt}
              ago={props.selectedBox.createdAt}
              heartDisplay="none"
              commentDisplay="none"
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

  const renderFeed = () => {
    if (props.boxes.length > 0) {
      return sorted.map((box) => {
        const postDate = new Date(box.createdAt);
        const date = new Date();
        const ago = date - postDate;
        const numOfLikes = box.likes.length;
        const numOfComments = box.comments.length;
        return (
          <Segment
            key={box._id}
            basic
            onClick={() => setSelectedBox(box)}
            className="box-feed-item"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Box
              id={box._id}
              userId={box.userId}
              link={box._id}
              likes={box.likes}
              content={box.content}
              comments={box.comments}
              ago={ago}
              numOfLikes={numOfLikes}
              numOfComments={numOfComments}
              setOpen={setOpen}
              currentUserId={props.userInfo._id}
            />
          </Segment>
        );
      });
    } else {
      return (
        <Segment
          basic
          className="box-feed-item"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {" "}
          Loading
        </Segment>
      );
    }
  };

  return (
    <>
      {renderFeed()}
      {renderModal()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    selectedBox: state.selectedBox,
    comments: state.comment.comments,
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    allUsers: state.allUsers.users,
  };
};

const mapDispatchToProps = {
  getBoxes: () => getBoxes(),
  selectBox: (box) => selectBox(box),
  postComment: (comment) => postComment(comment),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxFeed);
