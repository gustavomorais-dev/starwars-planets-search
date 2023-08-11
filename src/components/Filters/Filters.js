import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import './Filters.css';

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
    availableColumns,
    setAvailableColumns,
    columnToOrder,
    setColumnToOrder,
    sortOrder,
    setSortOrder,
    setSortConfig,
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

  const handleColumnToOrderChange = (event) => {
    setColumnToOrder(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleClickAddFilter = () => {
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    setFilters([...filters, newFilter]);
    const newColumnOptions = availableColumns.filter((option) => option !== columnFilter);
    setAvailableColumns(newColumnOptions);
    if (newColumnOptions.length > 0) {
      setColumnFilter(newColumnOptions[0]);
    } else {
      setColumnFilter('');
    }
  };

  const handleDeleteAllFilters = () => {
    setFilters([]);
    const newColumnOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setAvailableColumns(newColumnOptions);
    setColumnFilter(newColumnOptions[0]);
  };

  const handleClickSort = () => {
    setSortConfig({ order: { column: setColumnToOrder, sort: sortOrder } });
  };

  return (
    <div className="filters-container">
      <div className="filters-content">
        <div>
          <label htmlFor="name-filter">Filtrar Planetas:</label>
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            value={ nameFilter }
            onChange={ handleNameFilterChange }
          />
        </div>
        <div>
          <label htmlFor="column-filter">Filtrar por Coluna:</label>
          <select
            id="column-filter"
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ handleColumnFilterChange }
          >
            {availableColumns.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="comparison-filter">Comparar:</label>
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ handleComparisonFilterChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <label htmlFor="value-filter">Valor:</label>
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ handleValueFilterChange }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClickAddFilter }
            disabled={ availableColumns.length === 0 }
          >
            Filtrar
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleDeleteAllFilters }
            disabled={ filters.length === 0 }
          >
            Remover Filtros
          </button>
        </div>
        <div>
          <label htmlFor="column-sort">Ordenar por:</label>
          <select
            id="column-sort"
            data-testid="column-sort"
            value={ columnToOrder }
            onChange={ handleColumnToOrderChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
          <label className="radio-select">
            <input
              type="radio"
              className="input-radio"
              name="sortOrder"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ handleSortOrderChange }
            />
            Ascendente
          </label>
          <label className="radio-select">
            <input
              type="radio"
              className="input-radio"
              name="sortOrder"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ handleSortOrderChange }
            />
            Descendente
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleClickSort }
            disabled={ sortOrder.length === 0 }
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
