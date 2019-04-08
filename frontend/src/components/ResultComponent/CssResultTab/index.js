import { Col, Row } from 'react-bootstrap';

import CssFileCard from './CssFileCard';
import React from 'react';
import chunkArray from '../../../utils/chunkArray';

export default props => {
  const { data: files } = props;
  const rows = chunkArray(files, 3);

  return rows.map((chunk, i) => (
    <React.Fragment key={i}>
      <Row>
        {chunk.map((file, ix) => (
          <Col md={4} key={ix}>
            <CssFileCard data={file} />
          </Col>
        ))}
      </Row>
      <br />
    </React.Fragment>
  ));
};
