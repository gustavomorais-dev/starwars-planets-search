import { render, act } from "@testing-library/react";
import planetsData from "./mocks/PlanetsAPI";
import App from "../App";

describe('Planets', () => {
  it('é feita uma requisição à api ao entrar na aplicação', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsData),
    })

    await act(async () => {
      render(<App />);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets',
    );
  });
});
