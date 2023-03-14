import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const corbaPath = '/meals/52771/in-progress';
const aquamarinePath = '/drinks/178319/in-progress';

const favBtnId = 'favorite-btn';

const favDrinkMock = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}];

describe('1. Testes no componente Recipes in Progress', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1.2 Verifica se a pagina de comidas em progresso contém os itens requeridos', async () => {
    renderWithRouter(<App />, { initialEntries: [corbaPath] });

    const titleH1 = screen.getByTestId('recipe-title');
    expect(titleH1).toBeInTheDocument();

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });

  it('1.3 Verifica se a pagina de bebidas em progresso contém os itens requeridos', async () => {
    renderWithRouter(<App />, { initialEntries: [aquamarinePath] });

    const titleH1 = screen.getByTestId('recipe-title');
    expect(titleH1).toBeInTheDocument();

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });

  it('1.3 Verifica se a pagina de comidas os checkbox e o botão de finalizar receita funciona', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [corbaPath] });

    const recipeTitle = await screen.findByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');

    const finishButton = await screen.findByTestId('finish-recipe-btn');

    const checkBtns = await screen.findAllByRole('checkbox');

    expect(checkBtns.length).toBe(8);
    userEvent.click(checkBtns[0]);
    userEvent.click(checkBtns[1]);
    userEvent.click(checkBtns[2]);
    userEvent.click(checkBtns[3]);
    userEvent.click(checkBtns[4]);
    userEvent.click(checkBtns[5]);
    userEvent.click(checkBtns[6]);
    userEvent.click(checkBtns[7]);

    expect(finishButton).toBeEnabled();

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('1.4 Verifica se a pagina de bebidas os checkbox e o botão de finalizar receita funcionak', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [aquamarinePath] });

    const recipeTitle = await screen.findByRole('heading', {
      name: /aquamarine/i,
    });
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle).toHaveTextContent('Aquamarine');

    const finishButton = await screen.findByTestId('finish-recipe-btn');
    const checkBtns = await screen.findAllByRole('checkbox');

    expect(checkBtns.length).toBe(3);
    userEvent.click(checkBtns[0]);
    userEvent.click(checkBtns[1]);
    userEvent.click(checkBtns[2]);

    expect(finishButton).toBeEnabled();

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('1.5 Verifica o funcionamento do botão de favoritar na pagina de receita de comida em progresso', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favDrinkMock));

    renderWithRouter(<App />, { initialEntries: [aquamarinePath] });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favDrinkMock);

    const favBtn = screen.getByTestId(favBtnId);
    userEvent.click(favBtn);
    userEvent.click(favBtn);
  });
});
