import { Card, Collapse } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_METHODS_METRICS } from '../../../../constants/js-metrics';
import getNestedProperty from 'lodash/get';

class MethodDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { data } = this.props;
    const { isOpen } = this.state;

    const summaryContent = (
      <React.Fragment>
        The function has a total of <strong>{data.paramNames.length}</strong>{' '}
        parameters:
        <br />
        <code style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {data.paramNames.join(', ')}
        </code>
        <hr />
      </React.Fragment>
    );

    const metrics = Object.keys(FILE_METHODS_METRICS).map((option, i) => (
      <li key={i}>
        {option}:
        <strong>
          {' ' + getNestedProperty(data, FILE_METHODS_METRICS[option])}
        </strong>
      </li>
    ));

    return (
      <Card>
        <Card.Body>
          <Card.Header>{data.name}</Card.Header>
          <br />
          <Card.Subtitle className="mb-2 text-muted">
            Lines: {data.sloc.logical}
          </Card.Subtitle>
          <Card.Text as="div">
            {summaryContent}
            <Collapse in={isOpen}>
              <div>
                <strong>Metrics: </strong>
                <ul>{metrics}</ul>
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
        </Card.Body>
      </Card>
    );
  }
}

export default MethodDetailsCard;
