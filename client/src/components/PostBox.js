import React from "react";
import PostBoxForm from "./PostBoxForm";
import { Divider, Segment } from "semantic-ui-react";
import { postBoxes } from "../actions";
import { connect } from "react-redux";

const PostBox = (props) => {

  const onFormSubmit = (values) => {
    const box = {
      userId: "1",
      content: values.boxText,
    };
    props.postBoxes(box);
    console.log("submitted box", box);
  };

  return (
    <Segment textAlign="center"  padded style={{minWidth: 420, minHeight: 250, background: "#12232e"}}>
      <PostBoxForm onFormSubmit={onFormSubmit} />
      <Divider hidden />
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    box: state.box,
  };
};

const mapDispatchToProps = {
  postBoxes: (box) => postBoxes(box),
};

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
