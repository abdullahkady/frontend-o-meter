import React from "react";
import { Card } from "react-bootstrap";

const JsResult = props => {
  const { file, metrics } = props.data;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Header>{file.split("/").pop()}</Card.Header>
        <br />
        <Card.Subtitle className="mb-2 text-muted">
          Lines: {metrics.aggregate.sloc.logical}
        </Card.Subtitle>
        <Card.Text as="div">
          {`The file contains a total of ${
            metrics.methods.length
          } methods, with an average of ${
            metrics.methodAverage.paramCount
          } argument per method`}
          <ul>
            <li>Cyclomatic Complexity: {metrics.aggregate.cyclomatic}</li>
            <li>Cyclomatic Density: {metrics.aggregate.cyclomaticDensity}</li>
            <li>Halstead difficulty{metrics.aggregate.halstead.difficulty}</li>
          </ul>
        </Card.Text>
        <hr />
        <Card.Footer className="justify-content-md-center">
          <pre style={{ whiteSpace: "pre-wrap" }}>{file}</pre>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default JsResult;
