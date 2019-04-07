import React from "react";
import { FILE_CHOICES } from "../../../constants/js-metrics";
import { Card, Button } from "react-bootstrap";
import getNestedProperty from "lodash/get";

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
          <hr />
          <strong>Metrics: </strong>

          <ul style={{ overflowY: "scroll", maxHeight: 200 }}>
            {Object.keys(FILE_CHOICES).map((optionKey, i) => (
              <li key={i}>
                {`${optionKey}: `}
                {getNestedProperty(metrics, FILE_CHOICES[optionKey])}
              </li>
            ))}
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
