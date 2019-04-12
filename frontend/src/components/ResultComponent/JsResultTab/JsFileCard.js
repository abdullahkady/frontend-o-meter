import { Card, Collapse } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_SORT_CHOICES } from '../../../constants/js-metrics';
import getNestedProperty from 'lodash/get';
import FileDetailsModal from './FileDetailsModal';

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
      <Card>
        <Card.Body>
          <Card.Header
            style={{ cursor: 'pointer' }}
            onClick={() => this.setState({ modalShow: true })}
          >
            {file.split('/').pop()}
          </Card.Header>
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
                    overflowY: 'scroll',
                    maxHeight: 200
                  }}
                >
                  {Object.keys(FILE_SORT_CHOICES).map((optionKey, i) => (
                    <li key={i}>
                      {`${optionKey}: `}
                      {getNestedProperty(metrics, FILE_SORT_CHOICES[optionKey])}
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
            {this.state.isOpen ? 'Hide ' : 'Show'} Metrics
          </button>
          <hr />

          <FileDetailsModal
            data={metrics}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <Card.Footer className="justify-content-md-center">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{file}</pre>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default JsResult;
