import { Col, Container, Row, Spinner } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_SORT_CHOICES } from '../../../constants/js-metrics';
import JsFileCard from './JsFileCard';
import SelectionBar from './SelectionBar';
import chunkArray from '../../../utils/chunkArray';
import filterFiles from '../../../utils/filterFiles';
import { sortFiles } from '../../../utils/sort';
import Joyride from 'react-joyride';

const STEPS = [
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > nav',
    hideCloseButton: true,
    disableBeacon: true,
    content: 'You can filter & sort the files using the metrics provided'
  },
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div',
    hideCloseButton: true,
    disableBeacon: true,
    content: 'Each file is represented in a card, with a summary of the metrics'
  },
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div > button',
    hideCloseButton: true,
    disableBeacon: true,
    content:
      'You can expand the file metrics to get a more detailed look at the aggregate metrics'
  },
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div > div.card-header',
    hideCloseButton: true,
    disableBeacon: true,
    content:
      'You can click on the file to show metrics about each function independently'
  }
];

class JsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: '',
      isAscending: false,
      filterOptions: null,
      isFiltering: false
    };
  }

  componentDidMount() {
    this.setState({ sortOption: 'Lines of Code(physical)' });
  }

  handleJoyRide = ({ lifecycle, index, status }) => {
    if (status === 'finished') {
      return this.props.onTourEnded();
    }
    if (lifecycle === 'complete' && index === 2) {
      document
        .querySelector(
          '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div > button'
        )
        .click();
    }
  };

  render() {
    let { data: rawFiles, startTour } = this.props;
    const { sortOption, isAscending, filterOptions, isFiltering } = this.state;
    const sortOptionObjectPath = FILE_SORT_CHOICES[sortOption];
    if (filterOptions) {
      const { filterValue, isGreaterThan, filterField } = filterOptions;
      const filterOptionObjectPath = FILE_SORT_CHOICES[filterField];
      rawFiles = filterFiles(
        rawFiles,
        filterOptionObjectPath,
        filterValue,
        isGreaterThan
      );
    }

    const files = sortFiles(rawFiles, isAscending, sortOptionObjectPath);
    const rows = chunkArray(files, 3);

    const filesCards = rows.map((chunk, i) => (
      <React.Fragment key={i}>
        <Row>
          {chunk.map((file, ix) => (
            <Col md={4} key={ix}>
              <JsFileCard data={file} />
            </Col>
          ))}
        </Row>
        <br />
      </React.Fragment>
    ));

    let pageContent;
    if (isFiltering) {
      pageContent = (
        <div>
          {Array(3).fill(
            <Spinner
              as="span"
              animation="grow"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          )}
        </div>
      );
    } else {
      pageContent = filesCards.length ? (
        filesCards
      ) : (
        <h1>Sorry, no JS files matching</h1>
      );
    }

    return (
      <React.Fragment>
        <Joyride
          disableCloseOnEsc={true}
          continuous
          steps={STEPS}
          run={startTour}
          callback={this.handleJoyRide}
        />
        <SelectionBar isAscending={isAscending} sortOption={sortOption} />
        <hr />
        <Container className="text-center" style={{ marginTop: '15px' }}>
          {pageContent}
        </Container>
      </React.Fragment>
    );
  }
}

export default JsTab;
