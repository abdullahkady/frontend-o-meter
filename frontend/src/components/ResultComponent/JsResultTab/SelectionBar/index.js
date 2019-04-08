import FilterForm from './FilterForm';
import { Navbar } from 'react-bootstrap';
import React from 'react';
import SortForm from './SortForm';

export default ({
  onSortChanged,
  sortOption,
  toggleOrder,
  isAscending,
  onFilter
}) => {
  return (
    <Navbar className="bg-light justify-content-between">
      <SortForm
        onSortChanged={onSortChanged}
        sortOption={sortOption}
        toggleOrder={toggleOrder}
        isAscending={isAscending}
      />
      <FilterForm onFilter={onFilter} />
    </Navbar>
  );
};
