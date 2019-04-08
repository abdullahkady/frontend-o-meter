import { Card } from 'react-bootstrap';
import React from 'react';

const CssResult = props => {
  const { file, metrics } = props.data;
  let totalOffenders = 0;
  const offenders = [];
  for (const key in metrics) {
    if (metrics.hasOwnProperty(key)) {
      totalOffenders += metrics[key].length;
      offenders.push({ type: key, occurrences: metrics[key].length });
    }
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Header>{file.split('/').pop()}</Card.Header>
        <br />
        <Card.Subtitle className="mb-2 text-muted">
          Total Offenders: {totalOffenders}
        </Card.Subtitle>
        <Card.Text as="div">
          <ul>
            {offenders.map((off, i) => (
              <li key={i}>
                <strong>{off.type}: </strong>
                {off.occurrences}
              </li>
            ))}
          </ul>
        </Card.Text>
        <hr />
        <Card.Footer className="justify-content-md-center">
          <pre style={{ whiteSpace: 'pre-wrap' }}>{file}</pre>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default CssResult;
