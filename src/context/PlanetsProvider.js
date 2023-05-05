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
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
