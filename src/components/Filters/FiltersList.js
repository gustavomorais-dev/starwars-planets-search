import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FiltersList() {
  const {
    filters,
    setFilters,
    availableColumns,
    setAvailableColumns,
  } = useContext(PlanetsContext);

  const handleDeleteFilter = (column) => {
    const filtersCopy = filters.slice();
    filtersCopy.forEach((filter, index) => {
      if (filter.column === column) {
        filtersCopy.splice(index, 1);
      }
    });
    setFilters(filtersCopy);
    setAvailableColumns([...availableColumns, column]);
  };

  return (
    <div>
      <p>Filters:</p>
      <ul>
        {filters.map((filter, index) => (
          <li key={ index } data-testid="filter">
            {filter.column}
            {filter.comparison}
            {filter.value}
            <button
              type="button"
              onClick={ () => handleDeleteFilter(filter.column) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiltersList;
