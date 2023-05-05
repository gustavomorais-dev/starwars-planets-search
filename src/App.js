import React from 'react';
import './App.css';
import Planets from './components/Planets/Planets';
import PlanetsProvider from './context/PlanetsProvider';
import Filters from './components/Filters/Filters';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Planets />
    </PlanetsProvider>
  );
}

export default App;
