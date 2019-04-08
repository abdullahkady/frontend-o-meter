import {
  Button,
  Dropdown,
  Form,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import React, { Component } from 'react';

import { FILE_SORT_CHOICES } from '../../../../constants/js-metrics';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterField: '',
      isGreaterThan: true,
      filterValue: 1
    };
  }

  componentDidMount() {
    this.setState({ filterField: 'Lines of Code(logical)' });
  }

  onFilterFieldChanged = filterField => {
    this.setState({ filterField });
  };

  onSubmit = e => {
    e.preventDefault();
    const { isGreaterThan, filterField, filterValue } = this.state;
    this.props.onFilter({ filterValue, isGreaterThan, filterField });
  };

  render() {
    const { filterField, isGreaterThan } = this.state;

    const dropDownOptions = Object.keys(FILE_SORT_CHOICES).map(
      (optionKey, i) => (
        <Dropdown.Item key={i} eventKey={optionKey} as="div">
          {optionKey}
        </Dropdown.Item>
      )
    );

    return (
      <Form inline onSubmit={this.onSubmit}>
        <InputGroup>
          <Dropdown onSelect={this.onFilterFieldChanged}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {filterField}
            </Dropdown.Toggle>
            <Dropdown.Menu>{dropDownOptions}</Dropdown.Menu>
          </Dropdown>
          <InputGroup.Append>
            <Button
              className="shadow-none"
              variant="outline-secondary"
              onClick={() => this.setState({ isGreaterThan: !isGreaterThan })}
            >
              {isGreaterThan ? '>' : '<'}
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <FormControl
          // FIXME: This :')
          style={{ maxWidth: 200 }}
          required
          min="1"
          max="1000"
          type="number"
          placeholder="Threshold"
          onChange={({ target }) =>
            this.setState({ filterValue: target.value })
          }
        />
        <Button type="submit">Filter</Button>
      </Form>
    );
  }
}

export default FilterForm;
