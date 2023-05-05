import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const { filterName, setFilterName } = useContext(PlanetsContext);

  const handleChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filterInput">Filter Planets: </label>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterName }
        onChange={ handleChange }
      />
    </div>
  );
}

export default Filters;
