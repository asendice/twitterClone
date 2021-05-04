import React, { useEffect } from "react";
import { Feed, Image, Icon, Grid, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import scary from "../images/scary.jpeg";
import { convertMili } from "../utils/Helper";
import {
  getUsers,
  addLikeUser,
  addLikeBox,
  delLikeUser,
  delLikeBox,
} from "../actions";
import { connect } from "react-redux";

const Box = (props) => {
  // creates ids object that contains user Id and the box or "post" id.
  // checks to see if the logged in user is in the box's "likes" array
  // passes ids object to the appropriate action creator depending on if the logged in user in that box's "likes" array
  const onHeartClick = () => {
    const ids = {
      userId: props.currentUserId,
      boxId: props.id,
    };

    if (props.likes.includes(props.userInfo._id)) {
      props.delLikeUser(ids);
      props.delLikeBox(ids);
    } else {
      props.addLikeUser(ids);
      props.addLikeBox(ids);
    }
  };

  const userName = props.allUsers.filter((user) => {
    if (user.id === props.userId) {
      return user;
    }
  });

  console.log('userName', userName)

  const name = userName.map((name) => {
    return name.name;
  });

  const profilePic = userName.map((name) => {
    return name.profilePic;
  });

  console.log(profilePic);

  // this is going to need to swith the selected user or however we solved that problem when click on other users profiles
  const renderLikeMsg = () => {
    return props.likes.includes(props.userInfo._id) && props.profile ? (
      <span>{props.userInfo.name} liked this post: </span>
    ) : (
      ""
    );
  };

  return (
    <>
      <Link to={`/main/comment/${props.link}`}>
        {renderLikeMsg()}
        <Card
          key={props.id}
          fluid
          style={{
            background: "#203647",
            boxShadow: "none",
          }}
        >
          <Header as="h3">
            <Image circular src={`http://localhost:8000/${profilePic}`} />{" "}
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
              Replying to{" "}
              <span style={{ color: "#4da8da" }}>{props.reply}</span>
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
                  color={props.likes.includes(props.userInfo._id) ? "red" : ""}
                  name={
                    props.likes.includes(props.userInfo._id)
                      ? "heart"
                      : "heart outline"
                  }
                />
                <span
                  style={{
                    marginLeft: "5px",
                    visibility: props.numOfLikes === 0 ? "hidden" : " ",
                    color: "grey",
                  }}
                >
                  {props.numOfLikes}
                </span>
              </button>
            </Grid.Column>
            <Grid.Column>
              <button
                onClick={() => props.setOpen(true)}
                className="box-btn-comment"
              >
                <Icon size="large" name="comment outline" />

                <span
                  style={{
                    marginLeft: "5px",
                    visibility: props.numOfComments === 0 ? "hidden" : "",
                    color: "grey",
                  }}
                >
                  {props.numOfComments}
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
    userInfo: state.userInfo.user.data.result,
    allUsers: state.allUsers.users,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addLikeUser: (ids) => addLikeUser(ids),
  addLikeBox: (ids) => addLikeBox(ids),
  delLikeUser: (ids) => delLikeUser(ids),
  delLikeBox: (ids) => delLikeBox(ids),
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
