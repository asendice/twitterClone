import React from "react";
import { Segment, Input, Icon } from "semantic-ui-react";

const SearchClone = (props) => {
  return (
    <Segment className="search-clone-card media-right-card">
      <Input fluid iconPosition="left" placeholder="Search twitterClone Users">
        <Icon name="search" color="#fff" />
        <input style={{ backgroundColor: "#12232e", color: "#fff" }} />
      </Input>
    </Segment>
  );
};

export default SearchClone;
