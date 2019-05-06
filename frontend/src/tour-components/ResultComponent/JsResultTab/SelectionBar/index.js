import { FILE_SORT_CHOICES } from '../../../../constants/js-metrics';
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
        choices={FILE_SORT_CHOICES}
      />
      <FilterForm onFilter={onFilter} />
    </Navbar>
  );
};
