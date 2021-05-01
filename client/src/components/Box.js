import React, { useEffect } from "react";
import { Feed, Image, Icon, Grid, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import scary from "../images/scary.jpeg";
import { convertMili } from "../utils/Helper";
import { getUsers, addLikeUser, addLikeBox } from "../actions";
import { connect } from "react-redux";

const Box = (props) => {


  const onHeartClick = () => {
    const ids = {
      userId: props.currentUserId,
      boxId: props.id,
    };

    console.log(ids, "ids");

    if (props.likes.includes(props.userInfo.data.result._id)) {
      return null;
    } else {
      props.addLikeUser(ids);
      props.addLikeBox(ids);
    }
  };

  const userName = props.otherUsers.filter((user) => {
    if (user.id === props.userId) {
      return user;
    }
  });

  const name = userName.map((name) => {
    return name.name;
  });

  return (
    <>
      <Link to={`/main/comment/${props.link}`}>
        <Card
          key={props.id}
          fluid
          style={{
            background: "#203647",
            boxShadow: "none",
          }}
        >
          <Header as="h3">
            <Image circular src={scary} />{" "}
            <span style={{ color: "#EEFBFB" }}>{name}</span>
            <span
              style={{
                color: "grey",
                fontSize: "15px",
                fontWeight: "normal",
              }}
            >
              {" - "}
              {props.ago > 0 ? convertMili(props.ago) : Date(props.time)}
            </span>
          </Header>
          {props.reply ? (
            <span style={{ marginLeft: "20px", color: "grey" }}>
              Replying to <span style={{ color: "#4da8da" }}>{}</span>
            </span>
          ) : (
            ""
          )}
          <Feed.Content>
            <span
              style={{
                color: "#fff",
                overflowWrap: "anywhere",
                fontSize: "20px",
              }}
            >
              {props.content}
            </span>
          </Feed.Content>
        </Card>
      </Link>
      <Feed.Meta style={{ display: `${props.display}` }}>
        <Grid>
          <Grid.Row columns={2} textAlign="center">
            <Grid.Column>
              <button className="box-btn-heart">
                <Icon
                  onClick={() => onHeartClick()}
                  size="large"
                  name="heart outline"
                />
                <span style={{ marginLeft: "5px" }}>
                  {props.numOfLikes === 0 ? " " : props.numOfLikes}
                </span>
              </button>
            </Grid.Column>
            <Grid.Column>
              <button
                onClick={() => props.setOpen(true)}
                className="box-btn-comment"
              >
                <Icon size="large" name="comment outline" />

                <span style={{ marginLeft: "5px" }}>
                  {props.numOfComments === 0 ? " " : props.numOfComments}
                </span>
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Feed.Meta>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boxes: state.box.boxes,
    userInfo: state.userInfo.user,
    otherUsers: state.otherUsers.users,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addLikeUser: (ids) => addLikeUser(ids),
  addLikeBox: (ids) => addLikeBox(ids),
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
