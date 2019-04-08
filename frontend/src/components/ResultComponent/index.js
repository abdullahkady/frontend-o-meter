import { Container, Tab, Tabs } from 'react-bootstrap';

import CssTab from './CssResultTab';
import JsTab from './JsResultTab';
import React from 'react';

export default props => {
  let { css, js } = props;

  return (
    <Container>
      <Tabs justify="center" defaultActiveKey="js">
        <Tab eventKey="js" title="JavaScript">
          <Container style={{ marginTop: '15px' }}>
            <JsTab data={js} />
          </Container>
        </Tab>
        <Tab eventKey="css" title="CSS">
          <Container style={{ marginTop: '15px' }}>
            <CssTab data={css} />
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};
