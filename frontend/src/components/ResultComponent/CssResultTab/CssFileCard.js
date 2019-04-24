import {
  Card,
  Collapse,
  OverlayTrigger,
  Popover,
  Table
} from 'react-bootstrap';
import {
  METRICS_DESCRIPTION,
  METRICS_DISPLAY_NAME
} from '../../../constants/css-metrics';
import React, { Component } from 'react';

const overlayFactory = offender => (
  <Popover title={METRICS_DISPLAY_NAME[offender]}>
    {METRICS_DESCRIPTION[offender]}
  </Popover>
);

class CssResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { isOpen } = this.state;
    const { file, metrics } = this.props.data;
    let totalOffenders = 0;
    const offenders = [];

    for (const key in metrics) {
      if (metrics.hasOwnProperty(key)) {
        totalOffenders += metrics[key].length;
        offenders.push({ type: key, occurrences: metrics[key].length });
      }
    }

    const cssOffendersTable = (
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {offenders.map((off, i) => (
            <tr key={i}>
              <td>
                {METRICS_DISPLAY_NAME[off.type]}
                <OverlayTrigger
                  placement="top"
                  overlay={overlayFactory(off.type)}
                >
                  <span>{' [?]'}</span>
                </OverlayTrigger>
              </td>
              <td>
                <strong>{off.occurrences}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Header>{file.split('/').pop()}</Card.Header>
          <br />
          <Card.Subtitle className="mb-2 text-muted">
            Total Possible Offenders: {totalOffenders}
          </Card.Subtitle>
          <Card.Text as="div">
            <Collapse in={isOpen}>
              <div>{cssOffendersTable}</div>
            </Collapse>
          </Card.Text>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ isOpen: !isOpen })}
          >
            {this.state.isOpen ? 'Hide ' : 'Show'} Offenders
          </button>
          <hr />
          <Card.Footer className="justify-content-md-center">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{file}</pre>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default CssResult;
