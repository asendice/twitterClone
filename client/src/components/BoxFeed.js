import React, { useEffect, useState } from "react";
import scary from "../images/scary.jpeg";
import {
  Feed,
  Modal,
  Image,
  Icon,
  Grid,
  Segment,
  Header,
  Card,
} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { getBoxes, selectBox, postComment, putComment } from "../actions";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { convertMili } from "../utils/Helper";

const BoxFeed = (props) => {
  const [open, setOpen] = useState(false);
  console.log(props.selectedBox, "props.selectedBox");
  useEffect(() => {
    props.getBoxes();
  }, [open]);

  const sorted = props.boxes.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  const setSelectedBox = (box) => {
    props.selectBox(box);
  };

  const onFormSubmit = (values) => {
    const comment = {
      id: uuid(),
      content: values.content,
      userId: 1,
      boxId: props.selectedBox._id,
    };
    props.postComment(comment);
    props.putComment(comment);
    setOpen(false);
    props.getBoxes();
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
            basic
            onClick={() => setSelectedBox(box)}
            fluid
            className="box-feed-item"
          >
            <Link to={`/main/comment/${box._id}`}>
              <Card
                key={box._id}
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
                    {box.content}
                  </span>
                </Feed.Content>
              </Card>
            </Link>
            <Feed.Meta>
              <Grid>
                <Grid.Row columns={2} textAlign="center">
                  <Grid.Column>
                    <Icon
                      size="large"
                      className="box-icon-heart"
                      name="heart outline"
                    />
                    <span style={{ color: "grey", marginLeft: "5px" }}>
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
        );
      });
    } else {
      return (
        <Segment
            basic
            fluid
            className="box-feed-item"
          > Loading </Segment>
      
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
  };
};

const mapDispatchToProps = {
  getBoxes: () => getBoxes(),
  selectBox: (box) => selectBox(box),
  postComment: (comment) => postComment(comment),
  putComment: (comment) => putComment(comment),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxFeed);
