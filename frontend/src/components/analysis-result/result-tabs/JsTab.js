import React from "react";
import JsResultCard from "../result-cards/JsResultCard";
import chunkArray from "../../../utils/chunckArray";
import { Row, Col } from "react-bootstrap";

export default props => {
  const { data: files } = props;
  const rows = chunkArray(files, 3);

  return rows.map((chunk, i) => (
    <React.Fragment>
      <Row key={i}>
        {chunk.map((file, ix) => (
          <Col md={4} key={ix}>
            <JsResultCard ix={ix} data={file} />
          </Col>
        ))}
      </Row>
      <br />
    </React.Fragment>
  ));
};
