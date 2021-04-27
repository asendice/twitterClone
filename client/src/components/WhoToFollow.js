import React from "react";
import scary from "../images/scary.jpeg";
import {
  Segment,
  Table,
  Image,
  Header,
  Divider,
  Button,
} from "semantic-ui-react";

const WhoToFollow = (props) => {
  return (
    <Segment className="wtf-card media-right-card">
      <Header as="h2" style={{ color: "#fff" }}>
        Who To Follow
      </Header>
      <Divider />
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
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default WhoToFollow;
