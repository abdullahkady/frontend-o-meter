import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default props => {
  const { data, onHide } = props;
  const fileMethods = props.data.methods;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">HEADING</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fileMethods.map(method => {
          return <p>{JSON.stringify(method)}</p>;
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
