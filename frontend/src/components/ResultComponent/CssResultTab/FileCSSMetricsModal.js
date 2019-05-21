import { Button, Container, Modal, Table } from 'react-bootstrap';
import {
  METRICS_DESCRIPTION,
  METRICS_DISPLAY_NAME
} from '../../../constants/css-metrics';

import React from 'react';
import StickyPopOverComponent from '../../StickyPopOverComponent';

export default ({ metrics, onHide, ...remainingProps }) => {
  const metricsTable = (
    <Table striped hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(metrics).map((metric, i) => (
          <tr key={i}>
            <td>
              {METRICS_DISPLAY_NAME[metric]}
              <StickyPopOverComponent
                title={METRICS_DISPLAY_NAME[metric]}
                content={METRICS_DESCRIPTION[metric]}
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
              <strong>{metrics[metric]}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Modal
      className="text-center"
      onHide={onHide}
      {...remainingProps}
      size="lg"
      centered
    >
      <Modal.Body>
        <Container className="text-center">{metricsTable}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
