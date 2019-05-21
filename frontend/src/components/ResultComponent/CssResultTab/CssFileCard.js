import { Card, Collapse, Table } from 'react-bootstrap';
import {
  METRICS_DESCRIPTION,
  METRICS_DISPLAY_NAME
} from '../../../constants/css-metrics';
import React, { Component } from 'react';

import { FaLink } from 'react-icons/fa';
import FileCSSMetricsModal from './FileCSSMetricsModal';
import StickyPopOverComponent from '../../StickyPopOverComponent';

class CssResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { isOpen } = this.state;
    const {
      file,
      metrics: { offenders: rawOffenders, metrics }
    } = this.props.data;
    let totalOffenders = 0;
    const offenders = [];

    for (const key in rawOffenders) {
      if (rawOffenders.hasOwnProperty(key)) {
        totalOffenders += rawOffenders[key].length;
        offenders.push({ type: key, occurrences: rawOffenders[key].length });
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
                <StickyPopOverComponent
                  title={METRICS_DISPLAY_NAME[off.type]}
                  content={METRICS_DESCRIPTION[off.type]}
                  placement="top"
                  onMouseEnter={() => {}}
                  delay={200}
                >
                  <strong style={{ cursor: 'pointer', color: 'blue' }}>
                    {' [?]'}
                  </strong>
                </StickyPopOverComponent>
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
          <Card.Header
            style={{ cursor: 'pointer' }}
            onClick={() => this.setState({ shouldShow: true })}
          >
            {file.split('/').pop()}
            <FaLink color="blue" className="float-right" />
          </Card.Header>
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
          <FileCSSMetricsModal
            fileName={file}
            metrics={metrics}
            show={this.state.shouldShow}
            onHide={() => this.setState({ shouldShow: false })}
          />
          <Card.Footer className="justify-content-md-center">
            <pre style={{ whiteSpace: 'pre-wrap' }}>{file}</pre>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

export default CssResult;
