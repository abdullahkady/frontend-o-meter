import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';

import { FILE_SORT_CHOICES } from '../../../../constants/js-metrics';
import React from 'react';

export default ({ onSortChanged, sortOption, toggleOrder, isAscending }) => {
  const dropDownOptions = Object.keys(FILE_SORT_CHOICES).map((optionKey, i) => (
    <Dropdown.Item key={i} eventKey={optionKey} as="div">
      {optionKey}
    </Dropdown.Item>
  ));

  return (
    <Form inline>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>SORT</InputGroup.Text>
        </InputGroup.Prepend>
        <Dropdown onSelect={onSortChanged}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {sortOption}
          </Dropdown.Toggle>
          <Dropdown.Menu>{dropDownOptions}</Dropdown.Menu>
        </Dropdown>
        <InputGroup.Append>
          <Button
            className="shadow-none"
            variant="outline-secondary"
            onClick={toggleOrder}
          >
            {isAscending ? 'ASC' : 'DESC'}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};