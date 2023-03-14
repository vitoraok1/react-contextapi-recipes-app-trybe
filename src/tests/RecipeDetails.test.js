import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const favBtnId = 'favorite-btn';
const drinkDetailsRout = '/drinks/178319';
const mealDetailsRoute = '/meals/52771';

const favDrinkMock = [{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}];

const favMealMock = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];

const localStore = [
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
];

describe('1. Testes no componente CategoryButtons', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1.2 Verifica se na pagina de detalhes de Comida possui os componentes referentes', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneMeal),
    }));

    renderWithRouter(<App />, { initialEntries: [mealDetailsRoute] });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId(favBtnId)).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('3-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('4-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('5-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('6-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('7-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('video')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
    });
  });

  it('1.3 Verifica se na pagina de detalhes de Bebida possui os componentes referentes', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneDrink),
    }));

    renderWithRouter(<App />, { initialEntries: ['/drinks/178319'] });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /aquamarine/i })).toBeInTheDocument();
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId(favBtnId)).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.queryByTestId('video')).not.toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
    });
  });

  it('1.4 Verifica a funcionalidade do botão de favoritar e compartilhar na pagina de Bebidas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneDrink),
    }));

    const { history } = renderWithRouter(<App />, { initialEntries: [drinkDetailsRout] });

    const favBtn = screen.getByTestId(favBtnId);

    expect(favBtn).toBeInTheDocument();
    expect(favBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId(favBtnId));
    expect(favBtn.src).toBe('http://localhost/blackHeartIcon.svg');

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();

    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  it('1.5 Verifica se a receita é salva no localStorage na página de Bebidas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneDrink),
    }));

    localStorage.setItem('favoriteRecipes', JSON.stringify(favDrinkMock));

    renderWithRouter(<App />, { initialEntries: [drinkDetailsRout] });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favDrinkMock);

    const favBtn = screen.getByTestId(favBtnId);
    userEvent.click(favBtn);
    userEvent.click(favBtn);
  });

  it('1.6 Verifica se a receita é salva no localStorage na página de Comidas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneMeal),
    }));

    localStorage.setItem('favoriteRecipes', JSON.stringify(favMealMock));

    renderWithRouter(<App />, { initialEntries: [mealDetailsRoute] });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favMealMock);

    const favBtn = screen.getByTestId(favBtnId);
    userEvent.click(favBtn);
    userEvent.click(favBtn);
  });

  it('1.7 Verifica se o botão de compartilhar funciona página de Comidas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneMeal),
    }));

    localStorage.setItem('doneRecipes', JSON.stringify(localStore));
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    renderWithRouter(<App />, { initialEntries: [mealDetailsRoute] });

    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);
    expect(screen.getByText(/link copied!/i));
  });

  it('1.8 Verifica se o botão de compartilhar funciona página de Bebidas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (oneDrink),
    }));

    localStorage.setItem('doneRecipes', JSON.stringify(localStore));
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    renderWithRouter(<App />, { initialEntries: [drinkDetailsRout] });

    const btnShare = screen.getByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);
    expect(screen.getByText(/link copied!/i));
  });
});
