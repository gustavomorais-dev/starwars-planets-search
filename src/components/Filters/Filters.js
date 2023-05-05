import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const {
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filters,
    setFilters,
  } = useContext(PlanetsContext);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleColumnFilterChange = (event) => {
    setColumnFilter(event.target.value);
  };

  const handleComparisonFilterChange = (event) => {
    setComparisonFilter(event.target.value);
  };

  const handleValueFilterChange = (event) => {
    setValueFilter(event.target.value);
  };

  const handleClick = () => {
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilters([...filters, newFilter]);
  };

  return (
    <div>
      <label htmlFor="filterInput">Filter Planets: </label>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleNameFilterChange }
      />
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ handleColumnFilterChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ handleComparisonFilterChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ handleValueFilterChange }
      />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
