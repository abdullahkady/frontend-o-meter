import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import JsTab from "./result-tabs/JsTab";
import CssTab from "./result-tabs/CssTab";

export default props => {
  let { css, js } = props;

  return (
    <Container>
      <Tabs defaultActiveKey="js" id="uncontrolled-tab-example">
        <Tab eventKey="js" title="JavaScript">
          <Container style={{ marginTop: "15px" }}>
            <JsTab data={js} />
          </Container>
        </Tab>
        <Tab eventKey="css" title="CSS">
          <Container style={{ marginTop: "15px" }}>
            <CssTab data={css} />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};
