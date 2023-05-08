import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanetsContext from '../context/PlanetsContext';
import Filters from '../components/Filters/Filters';

const mockPlanetsContext = {
  nameFilter: '',
  setNameFilter: jest.fn(),
  columnFilter: '',
  setColumnFilter: jest.fn(),
  comparisonFilter: '',
  setComparisonFilter: jest.fn(),
  valueFilter: '',
  setValueFilter: jest.fn(),
  filters: [],
  setFilters: jest.fn(),
  availableColumns: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  setAvailableColumns: jest.fn(),
  columnToOrder: 'population',
  setColumnToOrder: jest.fn(),
  sortOrder: 'ASC',
  setSortOrder: jest.fn(),
  setSortConfig: jest.fn(),
};

describe('Filters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    expect(screen.getByLabelText('Filtrar Planetas:')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrar por Coluna:')).toBeInTheDocument();
    expect(screen.getByLabelText('Comparar:')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Ordenar por:')).toBeInTheDocument();
    expect(screen.getByText('Ascendente')).toBeInTheDocument();
    expect(screen.getByText('Descendente')).toBeInTheDocument();
    expect(screen.getByText('Filtrar')).toBeInTheDocument();
    expect(screen.getByText('Remover Filtros')).toBeInTheDocument();
    expect(screen.getByText('Ordenar')).toBeInTheDocument();
  });

  it('tem um handle funcional para o name-filter', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const nameFilterInput = screen.getByTestId('name-filter');
    userEvent.type(nameFilterInput, 'T');

    expect(mockPlanetsContext.setNameFilter).toHaveBeenCalledWith('T');
  });

  it('tem um handle funcional para o column filter', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const columnFilterSelect = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilterSelect, 'diameter');

    expect(mockPlanetsContext.setColumnFilter).toHaveBeenCalledWith('diameter');
  });

  it('tem um handle funcional para o comparison filter', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');

    expect(mockPlanetsContext.setComparisonFilter).toHaveBeenCalledWith('maior que');
  });

  it('tem um handle funcional para o value filter', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const valueFilterInput = screen.getByTestId('value-filter');
    userEvent.type(valueFilterInput, '5');

    expect(mockPlanetsContext.setValueFilter).toHaveBeenCalledWith('5');
  });

  it('tem um handle funcional para o column sort', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const columnSortSelect = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSortSelect, 'diameter');

    expect(mockPlanetsContext.setColumnToOrder).toHaveBeenCalledWith('diameter');
  });

  it('tem um handle funcional para as opções de ordenação', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const sortAscRadio = screen.getByTestId('column-sort-input-asc');
    const sortDescRadio = screen.getByTestId('column-sort-input-desc');

    userEvent.click(sortAscRadio);
    expect(mockPlanetsContext.setSortOrder).toHaveBeenCalledWith('ASC');

    userEvent.click(sortDescRadio);
    expect(mockPlanetsContext.setSortOrder).toHaveBeenCalledWith('DESC');
  });

  it('o botão de adicionar filtro funciona corretamente', () => {
    render(
      <PlanetsContext.Provider value={ mockPlanetsContext }>
        <Filters />
      </PlanetsContext.Provider>,
    );

    const filterBtn = screen.getByText('Filtrar');

    userEvent.type(screen.getByTestId('value-filter'), '10000')
    userEvent.click(filterBtn);

    expect(mockPlanetsContext.setFilters).toHaveBeenCalled;

    mockPlanetsContext.availableColumns = [''];

    userEvent.click(filterBtn);
    expect(mockPlanetsContext.setColumnFilter).not.toHaveBeenCalled;
  });
});
