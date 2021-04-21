import React, { useEffect } from "react";
import scary from "../images/scary.jpeg";
import {
  Feed,
  Divider,
  Image,
  Icon,
  Grid,
  Segment,
  Header,
  Card,
} from "semantic-ui-react";
import { getBoxes } from "../actions";
import { connect } from "react-redux";
import { convertMili } from "../utils/Helper";

const BoxFeed = (props) => {
  console.log(props.boxes, "props.box");
  useEffect(() => {
    props.getBoxes();
  }, []);

  const sorted = props.boxes.sort((a, b) => {
    const one = new Date(a.createdAt);
    const two = new Date(b.createdAt);
    return two - one;
  });

  const renderFeed = () => {
    if (props.boxes.length > 0) {
      return sorted.map((box) => {
        const postDate = new Date(box.createdAt);
        const date = new Date();
        const ago = date - postDate;
        const numOfLikes = box.likes.length;
        const numOfComments= box.comments.length
        return (
          <>
            <Card
              key={box._id}
              fluid
              style={{
                background: "#203647",
                border: "none",
                boxShadow: "none",
              }}
            >
              <Header as="h3">
                <Image circular src={scary} />
                <span style={{ color: "#EEFBFB" }}> @userName </span>
                <span style={{ color: "grey", fontSize: "15px", fontWeight: "normal" }}>
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
            <Feed.Meta>
              <Grid>
                <Grid.Row columns={2} textAlign="center">
                  <Grid.Column>
                    
                    <Icon
                      size="large"
                      style={{ color: "#4DA8DA" }}
                      name="heart outline"
                    />
                    <span style={{color: "#4DA8DA" , marginLeft: "10px"}}>{numOfLikes === 0 ? " " : numOfLikes}</span>
                  </Grid.Column>
                  <Grid.Column>
                    
                    <Icon
                      size="large"
                      style={{ color: "#4DA8DA" }}
                      name="comment outline"
                    />
                    <span style={{color: "#4DA8DA" , marginLeft: "10px"}}>{numOfComments === 0 ? " " : numOfComments}</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Feed.Meta>
            <Divider />
          </>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <Segment style={{ backgroundColor: "#203647", padding: 10, minWidth: 420 }}>
      {renderFeed()}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
  };
};

const mapDispatchToProps = {
  getBoxes: () => getBoxes(),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxFeed);
