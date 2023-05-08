import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Planets/Table/Table';
import PlanetsContext from '../context/PlanetsContext';

describe('Table', () => {
  const mockPlanets = [
    {
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.dev/api/planets/2/',
    },
    {
      name: 'Yavin IV',
      rotation_period: '24',
      orbital_period: '4818',
      diameter: '10200',
      climate: 'temperate, tropical',
      gravity: '1 standard',
      terrain: 'jungle, rainforests',
      surface_water: '8',
      population: '1000',
      films: ['A New Hope'],
      created: '2014-12-10T11:37:19.144000Z',
      edited: '2014-12-20T20:58:18.421000Z',
      url: 'https://swapi.dev/api/planets/3/',
    },
  ];

  const mockContextValue = {
    planets: mockPlanets,
    nameFilter: '',
    filters: [],
    columnToOrder: 'name',
    sortOrder: 'ASC',
  };

  it('renderiza a tabela com as informações dos planetas', () => {
    render(
      <PlanetsContext.Provider value={mockContextValue}>
        <Table />
      </PlanetsContext.Provider>
    );

    const planetNames = screen.getAllByTestId('planet-name');

    expect(planetNames[0]).toHaveTextContent('Alderaan');
    expect(planetNames[1]).toHaveTextContent('Yavin IV');
  });

  it('filtra os planetas por nome ao digitar no input', () => {
    const { rerender } = render(
      <PlanetsContext.Provider value={mockContextValue}>
        <Table />
      </PlanetsContext.Provider>
    );

    rerender(
      <PlanetsContext.Provider
        value={{ ...mockContextValue, nameFilter: 'yavin' }}
      >
        <Table />
      </PlanetsContext.Provider>
    );

    const planetNames = screen.getAllByTestId('planet-name');

    expect(planetNames.length).toBe(1);
    expect(planetNames[0]).toHaveTextContent('Yavin IV');
  });

  it('renderiza os planetas com diametro maior que 11000', () => {
    const planets = mockPlanets;
    const nameFilter = '';
    const filters = [
      { column: 'diameter', comparison: 'maior que', value: '11000' },
    ];
    const columnToOrder = 'name';
    const sortOrder = 'ASC';
    render(
      <PlanetsContext.Provider value={{ planets, nameFilter, filters, columnToOrder, sortOrder }}>
        <Table />
      </PlanetsContext.Provider>
    );
  
    expect(screen.getByTestId('planet-name')).toHaveTextContent('Alderaan');
    expect(screen.getByTestId('planet-name')).not.toHaveTextContent('Yavin IV');
  });
});