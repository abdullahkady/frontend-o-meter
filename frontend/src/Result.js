import React, { Component } from "react";
import CssResult from "./ResultTabs/CssResult";
import JsResult from "./ResultTabs/JsResult";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

function chunkArray(myArray, chunkSize) {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = myArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}

class Result extends Component {
  render() {
    let { css, js } = this.props;
    js = js.sort(
      (f1, f2) =>
        f2.metrics.aggregate.sloc.logical - f1.metrics.aggregate.sloc.logical
    );
    const jsRows = chunkArray(js, 3);
    const cssRows = chunkArray(css, 3);
    return (
      <Container>
        <Tabs defaultActiveKey="js" id="uncontrolled-tab-example">
          <Tab eventKey="js" title="JavaScript">
            <Container style={{ marginTop: "15px" }}>
              {jsRows.map((chunk, i) => (
                <React.Fragment>
                  <Row key={i}>
                    {chunk.map((file, ix) => (
                      <Col md={4} key={ix}>
                        <JsResult ix={ix} data={file} />
                      </Col>
                    ))}
                  </Row>
                  <br />
                </React.Fragment>
              ))}
            </Container>
          </Tab>
          <Tab eventKey="css" title="CSS">
            <Container style={{ marginTop: "15px" }}>
              {cssRows.map((chunk, i) => (
                <React.Fragment>
                  <Row key={i}>
                    {chunk.map((file, ix) => (
                      <Col md={4} key={ix}>
                        <CssResult ix={ix} data={file} />
                      </Col>
                    ))}
                  </Row>
                  <br />
                </React.Fragment>
              ))}
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Result;
