import React, { useState } from "react";
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
  addFollower,
  addFollowing,
  delFollower,
  delFollowing,
} from "../actions/index";
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
    if (filteredUsers.length === 0) {
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
    console.log(user, "user")
    const item = {
      currentUserId: props.userInfo._id,
      selectedUserId: user.id
    };
    if (user.followers.includes(props.userInfo._id)) {
      props.delFollower(item);
      props.delFollowing(item);
      props.getUsers();
    } else {
      props.addFollower(item);
      props.addFollowing(item);
      props.getUsers();
    }
  }

  const renderRow = () => {
    if (term.length > 0) {
      const newArr = filteredUsers.slice(0, 4);
      return newArr.map((user) => {
        return (
          <Table.Row key={user.id}>
            <Table.Cell>
              <a href={`/profile/${user.name}`}>
                <Image
                  style={{
                    maxWidth: 80,
                    minHeight: 80,
                    minWidth: 80,
                    maxHeight: 80,
                  }}
                  circular
                  src={`http://localhost:8000/${user.profilePic}`}
                />
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href={`/${user.name}`}>
                <Header as="h3" style={{ color: "#fff" }}>
                  {user.name}
                </Header>
              </a>
              <p style={{ color: "grey" }}>{user.bio}</p>
            </Table.Cell>
            <Table.Cell>
              {user.followers.includes(props.userInfo._id) ? (
                <Button
                  fluid
                  content="Following"
                  circular
                  className="edit-profile-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              ) : (
                <Button
                  fluid
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
              <a href={`/profile/${user.name}`}>
                <Image
                  style={{
                    maxWidth: 80,
                    minHeight: 80,
                    minWidth: 80,
                    maxHeight: 80,
                  }}
                  circular
                  src={`http://localhost:8000/${user.profilePic}`}
                />
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href={`/profile/${user.name}`}>
                <Header as="h3" style={{ color: "#fff" }}>
                  {user.name}
                </Header>
              </a>
              <p style={{ color: "grey" }}>{user.bio}</p>
            </Table.Cell>
            <Table.Cell>
              {user.followers.includes(props.userInfo._id) ? (
                <Button
                  fluid
                  content="Following"
                  circular
                  className="edit-profile-btn"
                  onClick={() => onFollowBtnClick(user)}
                />
              ) : (
                <Button
                  fluid
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
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
  addFollower: (item) => addFollower(item),
  addFollowing: (item) => addFollowing(item),
  delFollower: (item) => delFollower(item),
  delFollowing: (item) => delFollowing(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchClone);
