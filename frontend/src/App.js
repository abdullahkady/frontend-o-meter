import React, { Component } from "react";

import {
  Button,
  FormControl,
  Container,
  Alert,
  InputGroup
} from "react-bootstrap";
import Result from "./Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      css: [],
      js: []
    };
  }
  onSubmit = async () => {
    const { input } = this.state;
    if (!input) {
      this.setState({ error: "Please provide a path" });
      return;
    }

    const raw = await fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify({ dirPath: input }),
      headers: { "Content-Type": "application/json" }
    });
    if (raw.status === 200) {
      const { css, js } = await raw.json();
      this.setState({ css, js });
    } else {
      this.setState({ css: [], js: [], error: "Invalid path provided" });
    }
  };
  render() {
    const { css, js, error } = this.state;
    if (css && js && (css.length || js.length)) {
      return <Result css={css} js={js} />;
    }
    return (
      <Container style={{ marginTop: "10px" }}>
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
        <Button block={true} onClick={this.onSubmit} variant="primary">
          Submit
        </Button>
      </Container>
    );
  }
}

export default App;
