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

const ProfileFeed = (props) => {
  const [open, setOpen] = useState(false);
  console.log(props.selectedUser)
  useEffect(() => {
    props.getBoxes();
    props.getUsers();
  }, []);

  const filterBoxesByUserAndUserLikes = props.boxes.filter((box) => {
    if (
      props.userInfo.liked.includes(box._id) ||
      box.userId === props.userInfo.id
    ) {
      return box;
    }
  });

  const sorted = filterBoxesByUserAndUserLikes.sort((a, b) => {
    const one = new Date(a.updatedAt);
    const two = new Date(b.updatedAt);
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
    setTimeout(() => {
      props.getBoxes();
    }, 500);
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
            id={props.selectedBox.id}
            likes={props.selectedBox.likes}
            userName="@userName"
            comments={props.selectedBox.comments}
            userId={props.selectedBox.userId}
            content={props.selectedBox.content}
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
          >
            <Box
              id={box._id}
              profile={true}
              userId={box.userId}
              link={box._id}
              likes={box.likes}
              userName="@userName"
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
        <Segment basic className="box-feed-item">
          {" "}
          Nothing to display{" "}
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
    userInfo: state.userInfo.user.data.result,
    loggedIn: state.userInfo.loggedIn,
    allUsers: state.allUsers.users,
    selectedUser: state.selectedUser ? state.selectedUser : "sdfs"
  };
};

const mapDispatchToProps = {
  getBoxes: () => getBoxes(),
  selectBox: (box) => selectBox(box),
  postComment: (comment) => postComment(comment),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed);
