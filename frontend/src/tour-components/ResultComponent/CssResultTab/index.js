import { Col, Container, Navbar, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import CssFileCard from './CssFileCard';
import { METRICS_DISPLAY_NAME } from '../../../constants/css-metrics';
import SortForm from '../JsResultTab/SelectionBar/SortForm';
import chunkArray from '../../../utils/chunkArray';
import isEmpty from 'lodash/isEmpty';
import Joyride from 'react-joyride';

const REVERSE_DISPLAY_OPTIONS = {};
const STEPS = [
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > nav',
    hideCloseButton: true,
    disableBeacon: true,
    content:
      'You can sort the files using the offenders found in the files of your project'
  },
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div',
    hideCloseButton: true,
    disableBeacon: true,
    content:
      'Each file is represented in a card, with a summary of the offenders (selectors that are not compliant with the standards)'
  },
  {
    target:
      '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div > button',
    hideCloseButton: true,
    disableBeacon: true,
    content:
      'You can expand the file metrics to get a more detailed look at the aggregate metrics'
  }
];
class CssTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: '',
      isAscending: false
    };
  }

  componentDidMount() {
    // Only populate the sort list with the present offenders
    this.props.data.forEach(file => {
      Object.keys(file.metrics).forEach(key => {
        const displayValue = METRICS_DISPLAY_NAME[key];
        if (!REVERSE_DISPLAY_OPTIONS[displayValue])
          REVERSE_DISPLAY_OPTIONS[displayValue] = key;
      });
    });
    // Set a default sort value
    if (!isEmpty(REVERSE_DISPLAY_OPTIONS))
      this.setState({ sortOption: Object.keys(REVERSE_DISPLAY_OPTIONS)[0] });
  }

  handleJoyRide = ({ lifecycle, index, status }) => {
    if (lifecycle === 'complete' && index === 2) {
      document
        .querySelector(
          '#root > div.container > div.tab-content > div.fade.tab-pane.active.show > div > div.text-center.container > div > div:nth-child(1) > div > div > button'
        )
        .click();
      setTimeout(() => {
        // TODO: FIXME!
        return this.props.onTourEnded();
      }, 2000);
    }
  };

  render() {
    let { data: files, startTour } = this.props;
    const { sortOption, isAscending } = this.state;

    const sortOptionObjectPath = REVERSE_DISPLAY_OPTIONS[sortOption];

    if (sortOption) {
      files = files.sort(({ metrics: f1 }, { metrics: f2 }) => {
        const f1Value = f1[sortOptionObjectPath]
          ? f1[sortOptionObjectPath].length
          : 0;
        const f2Value = f2[sortOptionObjectPath]
          ? f2[sortOptionObjectPath].length
          : 0;
        return isAscending ? f1Value - f2Value : f2Value - f1Value;
      });
    }

    const rows = chunkArray(files, 3);

    return (
      <React.Fragment>
        <Joyride
          continuous
          disableCloseOnEsc={true}
          steps={STEPS}
          run={startTour}
          callback={this.handleJoyRide}
        />
        <Navbar className="bg-light justify-content-center">
          <SortForm
            choices={REVERSE_DISPLAY_OPTIONS}
            isAscending={isAscending}
            sortOption={sortOption}
            onSortChanged={this.onSortChanged}
            toggleOrder={() => this.setState({ isAscending: !isAscending })}
          />
        </Navbar>
        <Container className="text-center" style={{ marginTop: '15px' }}>
          {rows.length ? (
            rows.map((chunk, i) => (
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
            ))
          ) : (
            <h1>Sorry, no CSS files were found</h1>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default CssTab;
