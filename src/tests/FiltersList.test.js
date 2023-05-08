import React from 'react';
import { render, screen } from '@testing-library/react';
import FiltersList from '../components/Filters/FiltersList';
import PlanetsContext from '../context/PlanetsContext';
import userEvent from '@testing-library/user-event';

describe('FiltersList', () => {
  const mockFilters = [
    {
      column: 'population',
      comparison: 'maior que',
      value: '10000',
    },
    {
      column: 'diameter',
      comparison: 'maior que',
      value: '5000',
    },
  ];
  const mockAvailableColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const mockSetFilters = jest.fn();
  const mockSetAvailableColumns = jest.fn();
  const mockPlanetsContext = {
    filters: mockFilters,
    setFilters: mockSetFilters,
    availableColumns: mockAvailableColumns,
    setAvailableColumns: mockSetAvailableColumns,
  };

  beforeEach(() => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <FiltersList />
      </PlanetsContext.Provider>,
    );
  });

  it('renderiza corretamente a lista de filtros', () => {
    const filterItems = screen.getAllByTestId('filter');
    expect(filterItems.length).toBe(mockFilters.length);
  });

  it('renderiza as informações do filtro corretamente', () => {
    mockFilters.forEach((filter) => {
      expect(screen.getByText(new RegExp(`${filter.column}.*${filter.comparison}.*${filter.value}`))).toBeInTheDocument();
    });
  });

  it('deleta um filtro ao clicar no botão de delete', () => {
    const mockColumn = 'population';
    const expectedFiltersCopy = [{ column: 'diameter', comparison: 'maior que', value: '5000'}];
  
    const deleteButton = screen.getAllByRole('button', { name: /X/ });
    userEvent.click(deleteButton[0]);
  
    expect(mockSetFilters).toHaveBeenCalledWith(expectedFiltersCopy);
    expect(mockSetAvailableColumns).toHaveBeenCalledWith([...mockAvailableColumns, mockColumn]);
  });

});
