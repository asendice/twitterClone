import React, { useState } from "react";
import Loading from "./Loading";
import {
  Segment,
  Input,
  Icon,
  Table,
  Header,
  Button,
  Image,
  Divider,
} from "semantic-ui-react";
import {
  getUsers,
  selectUser,
  addFollower,
  addFollowing,
  delFollower,
  delFollowing,
} from "../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SearchClone = (props) => {
  const [term, setTerm] = useState("");

  const preSelectedUserArr = [
    "DarkHelmet",
    "MichaelScott",
    "SenSanders",
    "DwightSchrute",
  ];
  const preSelectedUsers = props.allUsers.filter((user) => {
    if (preSelectedUserArr.includes(user.name)) {
      return user;
    }
  });

  const filteredUsers = props.allUsers.filter((user) => {
    if (user.name.toLowerCase().includes(term.toLowerCase())) {
      return user;
    } else {
      return null;
    }
  });

  const renderSearchNf = () => {
    if (filteredUsers.length === 0 && !props.allUsersLoading) {
      return (
        <Table.Row>
          <Table.Cell>
            <Segment basic textAlign="center">
              <Header as="h3" style={{ color: "#fff" }}>
                Zero twitterClone users found for: "{term}"
              </Header>
            </Segment>
          </Table.Cell>
        </Table.Row>
      );
    }
  };

  const onFollowBtnClick = (user) => {
    const item = {
      currentUserId: props.userInfo._id,
      selectedUserId: user._id,
    };
    if (user.followers.includes(props.userInfo._id)) {
      props.delFollower(item);
      props.delFollowing(item);
    } else {
      props.addFollower(item);
      props.addFollowing(item);
    }
  };

  const renderRow = () => {
    if (props.allUsersLoading) {
      return (
        <Table.Row>
          <Table.Cell>
            <Loading />
          </Table.Cell>
        </Table.Row>
      );
    }
    if (term.length > 0) {
      const newArr = filteredUsers.slice(0, 7);
      return newArr.map((user) => {
        return (
          <Table.Row key={user._id}>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <Image
                  style={{
                    maxWidth: 60,
                    minHeight: 60,
                    minWidth: 60,
                    maxHeight: 60,
                  }}
                  circular
                  src={`http://localhost:8000/${user.profilePic}`}
                  onClick={() => props.selectUser(user)}
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <Header
                  onClick={() => props.selectUser(user)}
                  as="h3"
                  style={{ color: "#fff" }}
                >
                  {user.name}
                </Header>
              </Link>
              <p style={{ color: "grey" }}>{user.bio}</p>
            </Table.Cell>
            <Table.Cell>
              {user._id === props.userInfo._id ? (
                ""
              ) : user.followers.includes(props.userInfo._id) ? (
                <Button
                  content="Following"
                  circular
                  className="edit-profile-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              ) : (
                <Button
                  content="Follow"
                  circular
                  className="follow-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              )}
            </Table.Cell>
          </Table.Row>
        );
      });
    } else {
      return preSelectedUsers.map((user) => {
        return (
          <Table.Row key={user.name}>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <Image
                  style={{
                    maxWidth: 60,
                    minHeight: 60,
                    minWidth: 60,
                    maxHeight: 60,
                  }}
                  circular
                  src={`http://localhost:8000/${user.profilePic}`}
                  onClick={() => props.selectUser(user)}
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <Header
                  onClick={() => props.selectUser(user)}
                  as="h3"
                  style={{ color: "#fff" }}
                >
                  {user.name}
                </Header>
              </Link>
              <p style={{ color: "grey" }}>{user.bio}</p>
            </Table.Cell>
            <Table.Cell>
              {user._id === props.userInfo._id ? (
                ""
              ) : user.followers.includes(props.userInfo._id) ? (
                <Button
                  content="Following"
                  circular
                  className="edit-profile-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              ) : (
                <Button
                  content="Follow"
                  circular
                  className="follow-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              )}
            </Table.Cell>
          </Table.Row>
        );
      });
    }
  };

  return (
    <Segment
      className="search-clone-card media-right-card"
      style={{ minHeight: 300 }}
    >
      <Input fluid iconPosition="left" placeholder="Search twitterClone Users">
        <Icon name="search" style={{ color: "#fff" }} />
        <input
          onChange={(e) => setTerm(e.target.value)}
          className="search-input"
        />
      </Input>
      <Divider />
      {term.length === 0 ? (
        <Header textAlign="center" style={{ margin: "auto", color: "#4da8da" }}>
          Who to follow
        </Header>
      ) : (
        <Header textAlign="center" style={{ margin: "auto", color: "#4da8da" }}>
          Search Results
        </Header>
      )}
      <Divider />
      <Table basic="very">
        <Table.Body>
          {renderRow()}
          {renderSearchNf()}
        </Table.Body>
      </Table>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers.users,
    userInfo: state.userInfo.user,
    allUsersLoading: state.allUsers.isLoading,
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addFollower: (item) => addFollower(item),
  addFollowing: (item) => addFollowing(item),
  delFollower: (item) => delFollower(item),
  delFollowing: (item) => delFollowing(item),
  selectUser: (user) => selectUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchClone);
