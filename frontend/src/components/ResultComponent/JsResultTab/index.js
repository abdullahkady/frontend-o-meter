import { Col, Container, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_SORT_CHOICES } from '../../../constants/js-metrics';
import JsFileCard from './JsFileCard';
import SelectionBar from './SelectionBar';
import chunkArray from '../../../utils/chunkArray';
import filterFiles from '../../../utils/filterFiles';
import sortFiles from '../../../utils/sortFiles';

class JsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: '',
      isAscending: false,
      filterOptions: null
    };
  }

  componentDidMount() {
    this.setState({ sortOption: 'Lines of Code(logical)' });
  }

  onSortChanged = sortType => {
    this.setState({ sortOption: sortType });
  };

  onFilterSubmission = filterOptions => {
    this.setState({ filterOptions });
  };

  render() {
    let { data: rawFiles } = this.props;
    const { sortOption, isAscending, filterOptions } = this.state;
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

    return (
      <React.Fragment>
        <SelectionBar
          toggleOrder={() => this.setState({ isAscending: !isAscending })}
          onFilter={this.onFilterSubmission}
          isAscending={isAscending}
          sortOption={sortOption}
          onSortChanged={this.onSortChanged}
        />
        <Container style={{ marginTop: '15px' }}>{filesCards}</Container>
      </React.Fragment>
    );
  }
}

export default JsTab;
