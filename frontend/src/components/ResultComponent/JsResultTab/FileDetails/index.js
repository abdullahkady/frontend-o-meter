import { Button, Col, Container, Modal, Navbar, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_METHODS_METRICS_SORT_OPTIONS } from '../../../../constants/js-metrics';
import MethodDetailsCard from './MethodDetailsCard';
import SortForm from '../SelectionBar/SortForm';
import chunkArray from '../../../../utils/chunkArray';
import { sortMethods } from '../../../../utils/sort';

class FileDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: '',
      isAscending: false
    };
  }

  onSortChanged = sortType => {
    this.setState({ sortOption: sortType });
  };

  componentDidMount() {
    this.setState({ sortOption: 'Arguments/Parameters count' });
  }

  render() {
    const { isAscending, sortOption } = this.state;
    const { metrics, fileName, onHide, ...remainingProps } = this.props;

    const sortOptionObjectPath = FILE_METHODS_METRICS_SORT_OPTIONS[sortOption];
    const fileMethods = sortMethods(
      metrics.methods,
      isAscending,
      sortOptionObjectPath
    );

    const methodCards = chunkArray(fileMethods, 2).map((chunk, i) => {
      return (
        <React.Fragment key={i}>
          <Row>
            {chunk.map((method, i) => (
              <Col md={6} key={i}>
                <MethodDetailsCard data={method} />
              </Col>
            ))}
          </Row>
          <br />
        </React.Fragment>
      );
    });
    return (
      <Modal
        className="text-center"
        onHide={onHide}
        {...remainingProps}
        size="lg"
        centered
      >
        <Modal.Title as="div">
          <Navbar className="bg-light justify-content-center">
            <SortForm
              choices={FILE_METHODS_METRICS_SORT_OPTIONS}
              isAscending={isAscending}
              sortOption={sortOption}
              onSortChanged={this.onSortChanged}
              toggleOrder={() => this.setState({ isAscending: !isAscending })}
            />
          </Navbar>
        </Modal.Title>
        <Modal.Body
          style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}
        >
          <Container className="text-center">{methodCards}</Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FileDetailsModal;
