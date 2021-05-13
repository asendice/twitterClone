import React from "react";
import PostBoxForm from "./PostBoxForm";
import { Divider, Segment } from "semantic-ui-react";
import { postBoxes } from "../actions";
import { connect } from "react-redux";

const PostBox = (props) => {
  const onFormSubmit = (values) => {
    const box = {
      userId: props.userId,
      content: values.boxText,
      likes: [],
      comments: [],
    };
    props.postBoxes(box);
  };

  return (
    <Segment
      basic
      padded
      className="post-box"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <PostBoxForm onFormSubmit={onFormSubmit} />
      <Divider hidden />
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    box: state.box,
    userId: state.userInfo.user._id,
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
};

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
