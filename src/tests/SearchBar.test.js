import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import { mockDataMeals, mockDataDrinks } from './helpers/mockData';
import App from '../App';

const SEARCH_MENU = 'search-top-btn';
const SEARCH_BUTTON = 'exec-search-btn';

afterEach(() => jest.clearAllMocks());

describe('1. Testes no componente SearchBar', () => {
  it('1.2 Verifica se ao clicar no ícone de pesquisa é aberto o menu referente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_MENU));
      expect(screen.getByPlaceholderText(/search\.\.\./i)).toBeInTheDocument();
    });
  });

  it('1.3 Verifica se é possível filtrar e pesquisar por ingredientes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_MENU));
      userEvent.click(screen.getByRole('radio', {
        name: /ingredientes/i,
      }));
      userEvent.type(screen.getByRole('textbox'), 'chicken');
      userEvent.click(screen.getByTestId(SEARCH_BUTTON));
      expect(screen.getByRole('heading', {
        name: /brown stew chicken/i,
      })).toBeInTheDocument();
    });
  });

  it('1.5 Verifica se a mensagem de alerta aparece caso o usuário pesquise por duas letras com o checkbox "Primeira letra" selecionado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_MENU));
      userEvent.click(screen.getByRole('radio', {
        name: /primeira letra/i,
      }));
      userEvent.type(screen.getByRole('textbox'), 'kk');
      userEvent.click(screen.getByTestId(SEARCH_BUTTON));
      expect(screen.getByRole('alert')).toBeVisible();
    });
  });

  it('1.6 Verifica se a mensagem de alerta aparece caso o usuário pesquise por um nome que não existe', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    act(() => history.push('/drinks'));

    waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_MENU));
      userEvent.click(screen.getByRole('radio', {
        name: /nome/i,
      }));
      userEvent.type(screen.getByRole('textbox'), '151 Florida Bushwacker');
      userEvent.click(screen.getByTestId(SEARCH_BUTTON));
      expect(pathname).toBe('/drinks/14588');
    });
  });

  it('1.7 Verifica se é possível pesquisar por nome na página de comidas', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    waitFor(() => {
      userEvent.click(screen.getByTestId(SEARCH_MENU));
      userEvent.click(screen.getByRole('radio', {
        name: /nome/i,
      }));
      userEvent.type(screen.getByRole('textbox'), 'Potatoes');
      userEvent.click(screen.getByTestId(SEARCH_BUTTON));
      expect(screen.getAllByRole('img')).toHaveLength(10);
    });
  });

  // it('1.8 teste se as receitas da API de comida são renderizados', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockDataMeals),
  //   });

  //   const { history } = renderWithRouter(<App />);

  //   act(() => history.push('/meals'));

  //   waitFor(() => {
  //     const renderedRecipes = screen.getByText(/corba/i);
  //     expect(renderedRecipes).toBeInTheDocument();
  //     expect(global.fetch).toHaveBeenCalledTimes(1);
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  //     );
  //   });
  // });

  // it('1.8 teste se as receitas da API de bebida são renderizados', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockDataDrinks),
  //   });

  //   const { history } = renderWithRouter(<App />);

  //   act(() => history.push('/drinks'));

  //   waitFor(() => {
  //     const renderedRecipes = screen.getByText(/at&t/i);
  //     expect(renderedRecipes).toBeInTheDocument();
  //     expect(global.fetch).toHaveBeenCalledTimes(1);
  //     expect(global.fetch).toHaveBeenCalledWith(
  //       'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  //     );
  //   });
  // });
});
