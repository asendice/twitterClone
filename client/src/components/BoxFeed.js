import React, { useEffect } from "react";
import scary from "../images/scary.jpeg";
import { Feed, Divider, Image, Icon, Grid } from "semantic-ui-react";
import { getBoxes } from "../actions";
import { connect } from "react-redux";

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

  console.log("sorted", sorted);

  const renderFeed = () => {
    if (props.boxes.length > 0) {
      return sorted.map((box) => {
        const date = new Date(box.createdAt).toString()
        console.log(typeof(date.toString()), "toString")
        return (
          <>
            <Feed.Event key={box._id} fluid>
              <Feed.Label>
                <Image src={scary} />
              </Feed.Label>
              <Feed.Content>
                <Feed.User>
                  <span style={{ color: "#EEFBFB" }}> @userName </span>
                  <span>{date}</span>
                </Feed.User>
                <Feed.Extra
                  style={{ color: "#fff", overflowWrap: "anywhere" }}
                  text
                >
                  {box.content}
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
            <Feed.Meta>
              <Grid>
                <Grid.Row columns={2} textAlign="center">
                  <Grid.Column>
                    <Icon style={{ color: "#fff" }} name="heart outline" />
                  </Grid.Column>
                  <Grid.Column>
                    <Icon style={{ color: "#fff" }} name="comment outline" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Feed.Meta>
            <Divider />
          </>
        );
      });
    } else {
      console.log("fuckkkkk you");
    }
  };

  return (
    <Feed style={{ backgroundColor: "#12232E", padding: 10, minWidth: 420 }}>
      {renderFeed()}
    </Feed>
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
