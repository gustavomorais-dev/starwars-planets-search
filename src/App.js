import React from 'react';
import './App.css';
import Planets from './components/Planets/Planets';
import PlanetsProvider from './context/PlanetsProvider';
import Filters from './components/Filters/Filters';
import FiltersList from './components/Filters/FiltersList';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <FiltersList />
      <Planets />
    </PlanetsProvider>
  );
}

export default App;
