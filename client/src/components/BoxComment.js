import React, { useState, useEffect } from "react";
import scary from "../images/scary.jpeg";
import { convertMili } from "../utils/Helper";
import { connect } from "react-redux";
import uuid from "react-uuid";
import CommentForm from "./CommentForm";
import { postComment, getComments, putComment } from "../actions";
import {
  Segment,
  Modal,
  Grid,
  Feed,
  Card,
  Image,
  Icon,
  Header,
} from "semantic-ui-react";

const BoxComment = (props) => {
  const [open, setOpen] = useState(false);

  console.log(window.location.href)

  useEffect(() => {
    props.getComments(props.selectedBox._id);
  }, []);

  const numOfLikes =
    props.selectedBox ? props.selectedBox.likes.length : 0;
  const numOfComments =
    props.comments ? props.comments.length : null;

  const renderCommentFeed = () => {
    if (props.comments.length > 0) {
      return props.comments.map((comment) => {
        const date = new Date();
        const postDate = new Date(comment.createdAt);
        const commentAgo = date - postDate;
        return (
          <Segment style={{ background: "#203647", minWidth: 420 }}>
            <Card
              key={comment._id}
              fluid
              style={{
                background: "#203647",
                boxShadow: "none",
              }}
            >
              <Header as="h3">
                <Image circular src={scary} />
                <span style={{ color: "#EEFBFB" }}> {comment.userId} </span>
                <span
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "normal",
                  }}
                >
                  {" - "}
                  {convertMili(commentAgo)}
                </span>
              </Header>
              <span style={{ color: "#4DA8DA" }}>
                Replying to {props.selectedBox.userId}
              </span>
              <Feed.Content>
                <span
                  style={{
                    color: "#fff",
                    overflowWrap: "anywhere",
                    fontSize: "20px",
                  }}
                  text
                >
                  {comment.content}
                </span>
              </Feed.Content>
            </Card>
            <Feed.Meta></Feed.Meta>
          </Segment>
        );
      });
    } else {
      return (
        <Segment basic fluid className="box-feed-item">
          Loading
        </Segment>
      );
    }
  };

  const onFormSubmit = (values) => {
    console.log(values);
    const comment = {
      id: uuid(),
      content: values.content,
      userId: 1,
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
        <Card
          key={props.selectedBox._id}
          fluid
          style={{
            background: "#203647",
            boxShadow: "none",
          }}
        >
          <Header as="h3">
            <Image circular src={scary} />
            <span style={{ color: "#EEFBFB" }}> @userName </span>
            <span
              style={{
                color: "grey",
                fontSize: "15px",
                fontWeight: "normal",
              }}
            >
              {" - "}
              <span style={{ color: "grey" }}>
                {Date(props.selectedBox.createdAt)}
              </span>
            </span>
          </Header>

          <Feed.Content>
            <span
              style={{
                color: "#fff",
                overflowWrap: "anywhere",
                fontSize: "20px",
              }}
              text
            >
              {props.selectedBox.content}
            </span>
          </Feed.Content>
        </Card>
        <Feed.Meta>
          <Grid>
            <Grid.Row columns={2} textAlign="center">
              <Grid.Column>
                <Icon
                  size="large"
                  className="box-icon-heart"
                  name="heart outline"
                />
                <span style={{ color: "#4DA8DA", marginLeft: "10px" }}>
                  {numOfLikes === 0 ? " " : numOfLikes}
                </span>
              </Grid.Column>
              <Grid.Column>
                <Icon
                  onClick={() => setOpen(true)}
                  size="large"
                  className="box-icon-comment"
                  name="comment outline"
                />

                <span style={{ color: "#4DA8DA", marginLeft: "5px" }}>
                  {numOfComments === 0 ? " " : numOfComments}
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Feed.Meta>
      </Segment>
      {renderCommentFeed()}
      {renderModal()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedBox: state.selectedBox,
    comments: state.comment.comments,
  };
};

const mapDispatchToProps = {
  postComment: (comment) => postComment(comment),
  getComments: (id) => getComments(id),
  putComment: (comment) => putComment(comment),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxComment);
