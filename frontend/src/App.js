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
    const { input } = this.state;
    if (!input) {
      this.setState({ error: 'Please provide a path' });
      return;
    }

    const raw = await fetch('http://localhost:4000/', {
      method: 'POST',
      body: JSON.stringify({ dirPath: input }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (raw.status === 200) {
      const { css, js } = await raw.json();
      await delay(ANALYZE_DELAY_RANGE_SECS);
      this.setState({ css, js, isSubmitting: false });
    } else {
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
      <Button block={true} disabled variant="primary">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Analyzing ...
      </Button>
    ) : (
      <Button block={true} onClick={this.onSubmit} variant="primary">
        Submit
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
          />
        </InputGroup>
        <hr />
          {submitButton}
        </Jumbotron>
      </Container>
    );
  }
}

export default App;