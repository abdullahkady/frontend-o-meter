import { Container, Tab, Tabs } from 'react-bootstrap';

import CssTab from './CssResultTab';
import JsTab from './JsResultTab';
import React, { Component } from 'react';
import Joyride from 'react-joyride';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCSSTour: false,
      startJSTour: false,
      currentTab: 'js'
    };
  }

  render() {
    let { css, js, onTourEnded } = this.props;
    const steps = [
      {
        target: 'nav.nav-tabs.nav-justified',
        hideCloseButton: true,
        disableBeacon: true,
        content: 'Choose your desired tab to view the files'
      }
    ];
    return (
      <Container>
        <Joyride
          steps={steps}
          callback={({ status }) => {
            if (status === 'finished') this.setState({ startJSTour: true });
          }}
        />
        <Tabs
          onSelect={() => {}}
          activeKey={this.state.currentTab}
          justify="center"
        >
          <Tab eventKey="js" title="JavaScript">
            <Container style={{ marginTop: '15px' }}>
              <JsTab
                data={js}
                startTour={this.state.startJSTour}
                onTourEnded={() =>
                  this.setState({
                    startCSSTour: true,
                    currentTab: 'css',
                    startJSTour: false
                  })
                }
              />
            </Container>
          </Tab>
          <Tab eventKey="css" title="CSS">
            <Container style={{ marginTop: '15px' }}>
              <CssTab
                data={css}
                startTour={this.state.startCSSTour}
                onTourEnded={onTourEnded}
              />
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
