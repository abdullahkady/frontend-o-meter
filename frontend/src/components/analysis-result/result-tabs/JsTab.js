import React, { Component } from "react";
import getNestedProperty from "lodash/get";
import { FILE_SORT_CHOICES } from "../../../constants/js-metrics";
import JsResultCard from "../result-cards/JsResultCard";
import chunkArray from "../../../utils/chunkArray";
import { Row, Col, Dropdown } from "react-bootstrap";

class JsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: ""
    };
  }

  onSortChanged = sortType => {
    this.setState({ sortOption: sortType });
  };

  componentDidMount() {
    this.setState({ sortOption: "Lines of Code(logical)" });
  }

  render() {
    let { data: files } = this.props;
    const { sortOption } = this.state;
    const sortOptionObjectPath = FILE_SORT_CHOICES[sortOption];
    files = files.sort(
      (f1, f2) =>
        getNestedProperty(f2.metrics, sortOptionObjectPath) -
        getNestedProperty(f1.metrics, sortOptionObjectPath)
    );
    const rows = chunkArray(files, 3);
    return (
      <React.Fragment>
        <Dropdown onSelect={this.onSortChanged}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {this.state.sortOption}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(FILE_SORT_CHOICES).map((optionKey, i) => (
              <Dropdown.Item key={i} eventKey={optionKey} as="button">
                {optionKey}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {rows.map((chunk, i) => (
          <React.Fragment key={i}>
            <Row>
              {chunk.map((file, ix) => (
                <Col md={4} key={ix}>
                  <JsResultCard data={file} />
                </Col>
              ))}
            </Row>
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default JsTab;
