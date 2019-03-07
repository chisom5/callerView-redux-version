import React, { Component } from "react";

// general style
import { Container } from "../../style/init";
import TableList from "./_partials/tableList";

class VideoList extends Component {
  render() {
    return (
      <Container>
          <TableList />
      </Container>
    );
  }
}

export default VideoList;
