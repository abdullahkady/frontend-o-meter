import { Container, Tab, Tabs } from 'react-bootstrap';

import CssTab from './CssResultTab';
import JsTab from './JsResultTab';
import React from 'react';

const { remote, ipcRenderer } = window.require('electron');
const { Menu, MenuItem } = remote;

const exportJSON = data => {
  ipcRenderer.send('saveFile', data);
};

export default props => {
  let { css, js } = props;
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
    const menu = new Menu();
    const { js, css } = props;
    if (js.length) {
      menu.append(
        new MenuItem({
          label: 'Export JS',
          click: () => exportJSON(js)
        })
      );
    }
    if (css.length) {
      menu.append(
        new MenuItem({
          label: 'Export CSS',
          click: () => exportJSON(css)
        })
      );
    }
    if (css.length && js.length) {
      menu.append(
        new MenuItem({
          label: 'Export All',
          click: () => exportJSON({ js, css })
        })
      );
    }
    menu.popup(remote.getCurrentWindow());
  });

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
