import React, { useContext } from 'react';
import PlanetsContext from '../../../context/PlanetsContext';
import './Table.css';

function Table() {
  const {
    planets,
    nameFilter,
    filters,
    columnToOrder,
    sortOrder,
  } = useContext(PlanetsContext);

  const filteredPlanetsByName = planets
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()));

  const filteredPlanets = filteredPlanetsByName
    .filter((planet) => filters.every((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        return parseFloat(planet[filter.column]) > parseFloat(filter.value);
      case 'menor que':
        return parseFloat(planet[filter.column]) < parseFloat(filter.value);
      case 'igual a':
        return planet[filter.column] === filter.value;
      default:
        return true;
      }
    }));

  const sortedPlanets = filteredPlanets.sort((a, b) => {
    let aValue;
    let bValue;

    if (a[columnToOrder] === 'unknown') {
      if (sortOrder === 'DESC') {
        aValue = Number.MIN_SAFE_INTEGER;
      } else {
        aValue = Number.MAX_SAFE_INTEGER;
      }
    } else {
      aValue = parseFloat(a[columnToOrder]);
    }

    if (b[columnToOrder] === 'unknown') {
      if (sortOrder === 'DESC') {
        bValue = Number.MIN_SAFE_INTEGER;
      } else {
        bValue = Number.MAX_SAFE_INTEGER;
      }
    } else {
      bValue = parseFloat(b[columnToOrder]);
    }

    if (sortOrder === 'DESC') {
      return bValue - aValue; // ordem descendente
    }
    return aValue - bValue;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {sortedPlanets.map((planet, index) => (
          <tr key={ index }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films.join(', ')}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
