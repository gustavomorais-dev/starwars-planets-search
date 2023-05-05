import React, { useEffect, useState } from 'react';
import './style.css';
import Table from './Table/Table';

function Planets() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((planet) => {
          delete planet.residents;
        });
        setPlanets(data.results);
      });
  }, []);

  return <Table planets={ planets } />;
}

export default Planets;
