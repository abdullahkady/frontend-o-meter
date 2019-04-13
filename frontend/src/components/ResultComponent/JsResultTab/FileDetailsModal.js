import React from 'react';
import { Modal, Button, Jumbotron, Container } from 'react-bootstrap';
import { FILE_METHODS_METRICS } from '../../../constants/js-metrics';
import getNestedProperty from 'lodash/get';

export default props => {
  const { metrics, fileName, onHide, ...rest } = props;
  const fileMethods = metrics.methods;

  return (
    <Modal onHide={onHide} {...rest} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{fileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="text-center">
          {fileMethods.map((method, i) => {
            return (
              <React.Fragment key={i}>
                <Jumbotron>
                  <h1>
                    {method.name} <sub>({method.paramNames.join(', ')})</sub>
                  </h1>
                  <hr />
                  <ul>
                    {Object.keys(FILE_METHODS_METRICS).map((option, i) => (
                      <li key={i}>
                        <strong>{option}</strong>:{' '}
                        {getNestedProperty(
                          method,
                          FILE_METHODS_METRICS[option]
                        )}
                      </li>
                    ))}
                  </ul>
                </Jumbotron>
              </React.Fragment>
            );
          })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
