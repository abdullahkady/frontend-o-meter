import React, { Component } from "react";
import { FILE_CHOICES } from "../../../constants/js-metrics";
import { Card, Collapse } from "react-bootstrap";
import getNestedProperty from "lodash/get";

class JsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  render() {
    const { isOpen } = this.state;
    const { file, metrics } = this.props.data;
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
            <Collapse in={isOpen}>
              <div>
                <strong>Aggregate File Metrics: </strong>
                <ul
                  style={{
                    marginTop: 10,
                    overflowY: "scroll",
                    maxHeight: 200
                  }}
                >
                  {Object.keys(FILE_CHOICES).map((optionKey, i) => (
                    <li key={i}>
                      {`${optionKey}: `}
                      {getNestedProperty(metrics, FILE_CHOICES[optionKey])}
                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </Card.Text>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            {this.state.isOpen ? "Hide " : "Show"} Metrics
          </button>
          <hr />
          <Card.Footer className="justify-content-md-center">
            <pre style={{ whiteSpace: "pre-wrap" }}>{file}</pre>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default JsResult;
