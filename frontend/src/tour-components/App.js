import {
  Alert,
  Button,
  Container,
  FormControl,
  InputGroup,
  Jumbotron,
  Spinner
} from 'react-bootstrap';
import React, { Component } from 'react';
import Joyride, { STATUS } from 'react-joyride';

import ResultComponent from './ResultComponent';
import CONSTANT_METRICS from '../constants/exproted-metrics';

const fetchMetrics = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CONSTANT_METRICS);
    }, 2000);
  });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      css: [],
      js: [],
      isSubmitting: false
    };
  }

  onSubmit = async () => {
    this.setState({ isSubmitting: true });
    const metrics = await fetchMetrics();
    const { css, js } = metrics;
    this.props.onResultsChanged({ css, js });
    this.setState({ css, js, isSubmitting: false });
  };

  handleJoyrideCallback = data => {
    const { index, status, lifecycle } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      return this.setState({ run: false });
    }

    if (lifecycle === 'complete' && index === 1) {
      this.setState({
        input: 'SOME/ARBITRARY/DIRECTORY/PATH'
      });
    }

    if (lifecycle !== 'tooltip') return;
  };

  render() {
    const { css, js, error, isSubmitting } = this.state;
    if (css && js && (css.length || js.length)) {
      return (
        <ResultComponent
          onTourEnded={this.props.onTourEnded}
          css={css}
          js={js}
        />
      );
    }

    const submitButton = isSubmitting ? (
      <Button block={true} disabled variant="success">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Analyzing
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    ) : (
      <Button
        id="submit-button"
        block={true}
        onClick={this.onSubmit}
        variant="success"
      >
        Analyze
      </Button>
    );

    const steps = [
      {
        target: '#path-input',
        hideCloseButton: true,
        disableBeacon: true,
        content: "Enter your project's directory to be analyzed"
      },
      {
        target: '#browse-button',
        hideCloseButton: true,
        disableBeacon: true,
        content: 'Or easily browse the system files and locate your project!'
      },
      {
        target: '#path-input',
        hideCloseButton: true,
        disableBeacon: true,
        content: 'You can revise the path and modify it'
      },
      {
        target: '#submit-button',
        hideCloseButton: true,
        disableBeacon: true,
        textAlign: 'center',
        placement: 'bottom',
        disableOverlayClose: true,
        hideFooter: true,
        spotlightClicks: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        title: 'Submit!',
        content:
          "When you're ready, click on the analyze button to start the analysis of the provided directory"
      }
    ];

    return (
      <Container style={{ marginTop: '10px' }}>
        <Joyride
          callback={this.handleJoyrideCallback}
          disableCloseOnEsc={true}
          run={true}
          showProgress={true}
          disableOverlayClose={true}
          continuous={true}
          steps={steps}
        />
        <Jumbotron>
          <h1 className="text-center text-primary">Frontend-o-meter!</h1>
          <br />
          <h3 className="text-center text-info">
            Start by entering the path to your project directory
          </h3>
          <br />
          {error && <Alert variant="warning">{error}</Alert>}
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Path</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              id="path-input"
              aria-label="Project path"
              onChange={e => this.setState({ input: e.target.value })}
              value={this.state.input}
            />
            <InputGroup.Append>
              <Button id="browse-button" variant="primary">
                Browse
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <hr />
          {submitButton}
        </Jumbotron>
      </Container>
    );
  }
}

export default App;
