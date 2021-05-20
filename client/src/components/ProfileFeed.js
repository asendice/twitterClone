import React, { useEffect, useState } from "react";
import Box from "./Box";
import Loading from "./Loading";
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

  useEffect(() => {
    console.log(filterBoxesByUserAndUserLikes.length, "fbbuaul");

    if (
      filterBoxesByUserAndUserLikes &&
      filterBoxesByUserAndUserLikes.length > 3 &&
      filterBoxesByUserAndUserLikes.length < 5
    ) {
      const indexes = {
        firstIndex: props.index.firstIndex,
        secondIndex: props.index.secondIndex + 25,
      };

      props.getBoxes(indexes);
      props.getUsers();
    } else if (
      filterBoxesByUserAndUserLikes &&
      filterBoxesByUserAndUserLikes.length < 2
    ) {
      const indexes = {
        firstIndex: props.index.firstIndex,
        secondIndex: props.index.secondIndex + 100,
      };

      props.getBoxes(indexes);
      props.getUsers();
    } else {
      const indexes = {
        firstIndex: props.index.firstIndex,
        secondIndex: props.index.secondIndex,
      };
      props.getBoxes(indexes);
      props.getUsers();
    }
  }, [props.index.firstIndex, props.index.secondIndex]);

  const filterBoxesByUserAndUserLikes = props.boxes.filter((box) => {
    if (props.selectedUser.name) {
      if (
        props.selectedUser.liked.includes(box._id) ||
        box.userId === props.selectedUser._id
      ) {
        return box;
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

  const sorted = filterBoxesByUserAndUserLikes.sort((a, b) => {
    let one = new Date(a.updatedAt);
    let two = new Date(b.updatedAt);
    return two - one;
  });

  const setSelectedBox = (box) => {
    props.selectBox(box);
  };

  const replyName = props.allUsers.filter((item) => {
    const name = item._id === props.selectedBox.userId ? item.name : null;
    return name;
  });
  const mappedName = replyName.map((item) => {
    return item.name;
  });
  const onFormSubmit = (values) => {
    const comment = {
      id: uuid(),
      content: values.content,
      userId: props.userInfo._id,
      boxId: props.selectedBox._id,
    };
    props.postComment(comment);
    props.putComment(comment);
    setOpen(false);
  };

  const renderModal = () => {
    const postDate = new Date(props.selectedBox.createdAt);
    const date = new Date();
    const ago = date - postDate;
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
              suggestion={false}
              id={props.selectedBox.id}
              likes={props.selectedBox.likes}
              userName="@userName"
              comments={props.selectedBox.comments}
              userId={props.selectedBox.userId}
              content={props.selectedBox.content}
              time={props.selectedBox.createdAt}
              ago={ago}
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
    if (sorted.length > 0) {
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
              suggestion={false}
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
    } else if (sorted.length < 1 && !props.boxesLoading) {
      return (
        <Segment style={{ background: "#203647" }}>
          {" "}
          <span style={{ color: "#fff" }}>
            {props.selectedUser.name} has not posted anything yet...{" "}
          </span>
        </Segment>
      );
    }
  };

  return (
    <>
      {renderFeed()}
      {renderModal()}
      {props.boxesLoading ? <Loading /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    boxesLoading: state.box.isLoading,
    selectedBox: state.selectedBox,
    comments: state.comment.comments,
    userInfo: state.userInfo.user,
    loggedIn: state.userInfo.loggedIn,
    allUsers: state.allUsers.users,
    index: state.index,
    selectedUser: state.selectedUser,
  };
};

const mapDispatchToProps = {
  getBoxes: (indexes) => getBoxes(indexes),
  selectBox: (box) => selectBox(box),
  postComment: (comment) => postComment(comment),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed);
