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
import { getUsers } from "../actions/index";
import { connect } from "react-redux";

const SearchClone = (props) => {
  const [term, setTerm] = useState("");

  const arr = ["DarkHelmet", "MichaelScott", "SenSanders"];
  const preSelectedUsers = props.allUsers.filter((user) => {
    if (arr.includes(user.name)) {
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

  const renderRow = () => {
    if (term.length > 0) {
      return filteredUsers.map((user) => {
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
            </Table.Cell>
            <Table.Cell>
              <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                Follow
              </Button>
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
            </Table.Cell>
            <Table.Cell>
              <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                Follow
              </Button>
            </Table.Cell>
          </Table.Row>
        );
      });
    }
  };

  return (
    <Segment
      className="search-clone-card media-right-card"
      style={{ minHeight: 404 }}
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
  };
};

const mapDispatchToProps = {
  getUsers: () => getUsers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchClone);
