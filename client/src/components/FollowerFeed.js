import React, { useEffect, useState } from "react";
import { Segment, Modal, Icon, Divider } from "semantic-ui-react";
import Box from "./Box";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import uuid from "react-uuid";
import {
  getBoxes,
  selectBox,
  postComment,
  putComment,
  getUsers,
} from "../actions";
import { connect } from "react-redux";

const FollowerFeed = (props) => {
  const [open, setOpen] = useState(false);

  // ** very similar to what I wrote regarding profile feed **
  // in place to ensure there is always boxes avail to see and
  // to ensure window.onscroll will trigger to get more boxes
  useEffect(() => {
    if (
      filterBoxesByCurrentUserFollowing &&
      filterBoxesByCurrentUserFollowing.length < 5
    ) {
      const indexes = {
        firstIndex: props.index.firstIndex,
        secondIndex: props.index.secondIndex + 25,
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

  const filterFollowing = props.allUsers.filter((user) => {
    if (props.currentUser.following.includes(user._id)) {
      return user;
    } else {
      return null;
    }
  });

  const followingLikesList = filterFollowing.map((user) => {
    let list = user.liked[user.liked.length - 1];
    return list;
  });

  const filterBoxesByCurrentUserFollowing = props.boxes.filter((box) => {
    let arr = props.currentUser.following.concat(followingLikesList);
    if (arr.includes(box.userId) || arr.includes(box._id)) {
      return box;
    } else {
      return null;
    }
  });

  const sortFollowingBoxes = filterBoxesByCurrentUserFollowing.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
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
    const user = props.allUsers.filter((item) => {
      const name = item._id === props.selectedBox.userId ? item : null;
      return name;
    });

    const mappedName = user.map((item) => {
      return item.name;
    });
    if (props.selectedBox.likes) {
      const postDate = new Date(props.selectedBox.createdAt);
      const date = new Date();
      const ago = date - postDate;
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
              id={props.selectedBox._id}
              likes={props.selectedBox.likes}
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

  const renderFollowingFeed = () => {
    if (sortFollowingBoxes.length > 0) {
      return sortFollowingBoxes.map((box) => {
        const postDate = new Date(box.createdAt);
        const date = new Date();
        const ago = date - postDate;
        const numOfLikes = box.likes.length;
        const numOfComments = box.comments.length;
        return (
          <Segment
            key={box._id}
            basic
            onClick={() => props.selectBox(box)}
            className="box-feed-item"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <Box
              id={box._id}
              userId={box.userId}
              link={box._id}
              likes={box.likes}
              suggestion={!props.currentUser.following.includes(box.userId)}
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
    } else if (!props.boxesLoading && sortFollowingBoxes.length === 0) {
      return (
        <Segment className="box-zero-feed">
          {" "}
          <span style={{ color: "#fff" }}>
            You aren't following anyone! Check out Who to follow, or Everyone's
            feed and start following!{" "}
          </span>
        </Segment>
      );
    }
  };

  return (
    <>
      {renderFollowingFeed()}
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
    allUsers: state.allUsers.users,
    currentUser: !state.allUsers.isLoading
      ? state.allUsers.users.filter(
          (user) => user._id === state.userInfo.user._id
        )[0]
      : state.userInfo.user,
    index: state.index,
  };
};

const mapDispatchToProps = {
  getBoxes: (indexes) => getBoxes(indexes),
  selectBox: (box) => selectBox(box),
  postComment: (comment) => postComment(comment),
  putComment: (comment) => putComment(comment),
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowerFeed);
