import React, { useEffect } from "react";
import { Feed, Image, Icon, Grid, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import scary from "../images/scary.jpeg";
import { convertMili } from "../utils/Helper";
import { getUsers } from "../actions";
import { connect } from "react-redux";

const Box = (props) => {
  const onHeartClick = () => {
    props.addLikeUser();
    props.addLikeBox();
  };

  const userName = props.otherUsers.filter((user) => {
    if (user.id == props.userId) {
      return user;
    }
  });
  
  const name = userName.map((name)=> {
    return name.name;
  })

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
            <Image circular src={scary} />
            {" "}
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
              <span style={{ color: "#4da8da" }}>{}</span>
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
                <Icon size="large" name="heart outline" />
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
    userInfo: state.userInfo.user,
    otherUsers: state.otherUsers.users,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Box);
