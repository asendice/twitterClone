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
import { smallBio } from "../utils/Helper";
import { connect } from "react-redux";

const SearchClone = (props) => {
  const [term, setTerm] = useState("");

  // array of preSelectedUser to be displayed for all users
  const preSelectedUserArr = [
    "DarkHelmet",
    "MichaelScott",
    "SenSanders",
    "DwightSchrute",
  ];
  // ensuring the preselectedUsers are updated
  const preSelectedUsers = props.allUsers.filter((user) => {
    if (preSelectedUserArr.includes(user.name)) {
      return user;
    } else {
      return null;
    }
  });

  // utilized the search term to filter allUsers list
  const filteredUsers = props.allUsers.filter((user) => {
    if (user.name.toLowerCase().includes(term.toLowerCase())) {
      return user;
    } else {
      return null;
    }
  });

  // if filteredUsers contains no users and allUsers call is not loading
  // let the user know that their search term had no results 
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

  // checks if user's followers array contains the id of the loggedin user
  // if it does: the button click meant to unfollow - delete 
  // if it doesn't: the button click meant to follow - add 
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

  // if allUsers is loading call render loading component
  // if search term is longer than 0 return top 7 of filteredUsers and render
  // else return the preSelectedUsers
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
                  src={`${user.profilePic}`}
                  onClick={() => props.selectUser(user)}
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <h3
                  onClick={() => props.selectUser(user)}
                  className="follow-seg"
                >
                  {user.name}
                </h3>
              </Link>
              <p style={{ color: "grey" }}>{smallBio(user.bio)}</p>
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
                  src={`${user.profilePic}`}
                  onClick={() => props.selectUser(user)}
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link to={`/profile/${user.name}`}>
                <h3
                  onClick={() => props.selectUser(user)}
                  className="follow-seg"
                >
                  {user.name}
                </h3>
              </Link>

              <p style={{ color: "grey" }}>{smallBio(user.bio)}</p>
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
    <>
      <Segment
        className="search-clone-card media-right-card"
        style={{ minHeight: 300 }}
      >
        <Input
          fluid
          iconPosition="left"
          placeholder="Search twitterClone Users"
        >
          <Icon name="search" style={{ color: "#fff" }} />
          <input
            onChange={(e) => setTerm(e.target.value)}
            className="search-input"
          />
        </Input>
        <Divider />
        {term.length === 0 ? (
          <Header
            textAlign="center"
            style={{ margin: "auto", color: "#4da8da" }}
          >
            Who to follow
          </Header>
        ) : (
          <Header
            textAlign="center"
            style={{ margin: "auto", color: "#4da8da" }}
          >
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
      <Segment basic className="copy-right media-right-card" textAlign="center">
        <span style={{ color: "grey" }}>
          {" "}
          twitterClone <Icon name="copyright outline" /> 2021
        </span>
      </Segment>
    </>
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
