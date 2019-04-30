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

import { ANALYZE_DELAY_RANGE_SECS } from './config/';
import ResultComponent from './components/ResultComponent';
import delay from './utils/delay';

const { ipcRenderer } = window.require('electron');

const fetchMetrics = dirPath =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('analyzeDirectory', dirPath);
    ipcRenderer.on('analyzeDirectory-reply', (event, { err, result }) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });

const chooseDirectory = () =>
  new Promise((resolve, reject) => {
    ipcRenderer.send('chooseDirectory');
    ipcRenderer.on('chooseDirectory-reply', (event, dirPath) => {
      resolve(dirPath);
    });
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

  onBrowseDirectory = async () => {
    const dirPath = await chooseDirectory();
    this.setState({ input: dirPath });
  };

  onSubmit = async () => {
    this.setState({ isSubmitting: true });
    const { input } = this.state;

    if (!input) {
      this.setState({ error: 'Please provide a path', isSubmitting: false });
      return;
    }

    try {
      const res = await fetchMetrics(input);

      const { css, js } = res;
      await delay(ANALYZE_DELAY_RANGE_SECS);
      this.setState({ css, js, isSubmitting: false });
    } catch (err) {
      this.setState({
        css: [],
        js: [],
        error: 'Invalid path provided',
        isSubmitting: false
      });
    }
  };

  render() {
    const { css, js, error, isSubmitting } = this.state;
    if (css && js && (css.length || js.length)) {
      return <ResultComponent css={css} js={js} />;
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
      <Button block={true} onClick={this.onSubmit} variant="success">
        Analyze
      </Button>
    );

    return (
      <Container style={{ marginTop: '10px' }}>
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
              aria-label="Project path"
              onChange={e => this.setState({ input: e.target.value })}
              value={this.state.input}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={this.onBrowseDirectory}>
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
