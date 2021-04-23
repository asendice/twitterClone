import React, { useState, useEffect } from "react";
import scary from "../images/scary.jpeg";
import { convertMili } from "../utils/Helper";
import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import { postComment, getComments } from "../actions";
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

  useEffect(() => {
    props.getComments(props.selectedBox._id);
  }, []);

  const postDate = new Date(props.selectedBox.createdAt);
  const date = new Date();
  const ago = date - postDate;
  const numOfLikes = props.selectedBox.likes.length;
  const numOfComments = props.selectedBox.comments.length;

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
    }
  };

  const onFormSubmit = (values) => {
    console.log(values);
    const comment = {
      content: values.content,
      userId: 1,
      boxId: props.selectedBox._id,
    };
    props.postComment(comment);
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
        style={{ minWidth: 420, minHeight: 250, background: "#203647" }}
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
              {convertMili(ago)}
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

                <span style={{ color: "#4DA8DA", marginLeft: "10px" }}>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxComment);
