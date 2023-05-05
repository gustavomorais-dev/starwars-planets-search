import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FiltersList() {
  const { filters } = useContext(PlanetsContext);

  return (
    <div>
      <p>Filters:</p>
      <ul>
        {filters.map((filter, index) => (
          <li key={ index }>
            {filter.column}
            {filter.comparison}
            {filter.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiltersList;
