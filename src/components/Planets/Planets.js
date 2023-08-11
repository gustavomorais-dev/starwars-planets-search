import React, { useContext, useEffect } from 'react';
import Table from './Table/Table';
import PlanetsContext from '../../context/PlanetsContext';

function Planets() {
  const { setPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanets(data.results);
      });
  }, [setPlanets]);

  return <Table />;
}

export default Planets;
