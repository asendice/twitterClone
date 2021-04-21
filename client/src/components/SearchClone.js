import React from "react";
import scary from "../images/scary.jpeg";
import {
  Segment,
  Input,
  Icon,
  Table,
  Header,
  Button,
  Image,
  Tab,
} from "semantic-ui-react";

const SearchClone = (props) => {
  return (
    <Segment className="search-clone-card media-right-card">
      <Input fluid iconPosition="left" placeholder="Search twitterClone Users">
        <Icon name="search" style={{ color: "#fff" }} />
        <input style={{ backgroundColor: "#203647", color: "#fff" }} />
      </Input>
      <Table basic="very">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Image size="tiny" circular src={scary} />
            </Table.Cell>
            <Table.Cell>
              <Header as="h3" style={{ color: "#fff" }}>
                {" "}
                @userName
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                Follow
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Image size="tiny" circular src={scary} />
            </Table.Cell>
            <Table.Cell>
              <Header as="h3" style={{ color: "#fff" }}>
                {" "}
                @userName
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                Follow
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Image size="tiny" circular src={scary} />
            </Table.Cell>
            <Table.Cell>
              <Header as="h3" style={{ color: "#fff" }}>
                {" "}
                @userName
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Button style={{ background: "#4DA8DA", color: "#fff" }}>
                Follow
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default SearchClone;
