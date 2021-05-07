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
    <Segment textAlign="center" basic  padded style={{minWidth: 420, minHeight: 200, maxWidth: 650, background: "#203647"}}>
      <PostBoxForm onFormSubmit={onFormSubmit} />
      <Divider hidden />
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    box: state.box,
    userId: state.userInfo.user.data.result._id
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
};

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
