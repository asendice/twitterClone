import React, { useState } from "react";
import scary from "../images/scary.jpeg";
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

  const renderRow = () => {
    const filteredUsers = props.allUsers.filter((user) => {
      if (user.name.toLowerCase().includes(term.toLowerCase())) {
        return user;
      } else {
        return null;
      }
    });

    if (term.length > 0) {
      return filteredUsers.map((user) => {
        return (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Image size="tiny" circular src={scary} />
            </Table.Cell>
            <Table.Cell>
              <Header as="h3" style={{ color: "#fff" }}>
                {" "}
                {user.name}
              </Header>
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
      return (
        <Table.Row>
          <Table.Cell>
            <Image size="tiny" circular src={scary} />
          </Table.Cell>
          <Table.Cell>
            <Header as="h3" style={{ color: "#fff" }}>
              DylanTravis
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Button style={{ background: "#4DA8DA", color: "#fff" }}>
              Follow
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    }
  };

  return (
    <Segment className="search-clone-card media-right-card">
      <Input fluid iconPosition="left" placeholder="Search twitterClone Users">
        <Icon name="search" style={{ color: "#fff" }} />
        <input
          onChange={(e) => setTerm(e.target.value)}
          className="search-input"
        />
      </Input>
      <Divider />
      <Table basic="very">
        <Table.Body>{renderRow()}</Table.Body>
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
