import { Col, Container, Row, Spinner } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_SORT_CHOICES } from '../../../constants/js-metrics';
import { FILTER_DELAY_RANGE_SECS } from '../../../config/';
import JsFileCard from './JsFileCard';
import SelectionBar from './SelectionBar';
import chunkArray from '../../../utils/chunkArray';
import delay from '../../../utils/delay';
import filterFiles from '../../../utils/filterFiles';
import sortFiles from '../../../utils/sortFiles';

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
    this.setState({ sortOption: 'Lines of Code(logical)' });
  }

  onSortChanged = sortType => {
    this.setState({ sortOption: sortType });
  };

  onFilterSubmission = filterOptions => {
    this.setState({ isFiltering: true });
    return new Promise(async resolve => {
      await delay(FILTER_DELAY_RANGE_SECS);
      this.setState({ filterOptions, isFiltering: false });
      resolve();
    });
  };

  render() {
    let { data: rawFiles } = this.props;
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
        <h1>Sorry, no files matched your filter</h1>
      );
    }

    return (
      <React.Fragment>
        <SelectionBar
          toggleOrder={() => this.setState({ isAscending: !isAscending })}
          onFilter={this.onFilterSubmission}
          isAscending={isAscending}
          sortOption={sortOption}
          onSortChanged={this.onSortChanged}
        />
        <hr />
        <Container className="text-center" style={{ marginTop: '15px' }}>
          {pageContent}
        </Container>
      </React.Fragment>
    );
  }
}

export default JsTab;
