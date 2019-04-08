import React, { Component } from "react";
import getNestedProperty from "lodash/get";
import { FILE_SORT_CHOICES } from "../../../constants/js-metrics";
import JsResultCard from "../result-cards/JsResultCard";
import chunkArray from "../../../utils/chunkArray";
import {
  Row,
  Col,
  Dropdown,
  Navbar,
  Form,
  InputGroup,
  Button,
  Container
} from "react-bootstrap";

class JsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: "",
      isAscending: false
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
    const { sortOption, isAscending } = this.state;
    const sortOptionObjectPath = FILE_SORT_CHOICES[sortOption];
    files = files.sort(
      (f1, f2) =>
        getNestedProperty(
          (isAscending ? f1 : f2).metrics,
          sortOptionObjectPath
        ) -
        getNestedProperty((isAscending ? f2 : f1).metrics, sortOptionObjectPath)
    );
    const rows = chunkArray(files, 3);
    return (
      <React.Fragment>
        <Navbar className="bg-light justify-content-between">
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>SORT</InputGroup.Text>
              </InputGroup.Prepend>
              <Dropdown onSelect={this.onSortChanged}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {this.state.sortOption}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.keys(FILE_SORT_CHOICES).map((optionKey, i) => (
                    <Dropdown.Item key={i} eventKey={optionKey} as="div">
                      {optionKey}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <InputGroup.Append>
                <Button
                  className="shadow-none"
                  variant="outline-secondary"
                  onClick={() => this.setState({ isAscending: !isAscending })}
                >
                  {isAscending ? "ASC" : "DESC"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Navbar>
        <Container style={{ marginTop: "15px" }}>
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
        </Container>
      </React.Fragment>
    );
  }
}

export default JsTab;
