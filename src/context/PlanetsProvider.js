import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filters, setFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columnToOrder, setColumnToOrder] = useState('population');
  const [sortOrder, setSortOrder] = useState('');
  const [sortConfig, setSortConfig] = useState(
    {
      order: {
        column: 'population',
        sort: 'ASC',
      },
    },
  );

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        setPlanets,
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
        sortConfig,
        setSortConfig,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
