import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const localStorageMock = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  id: '178319',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  name: 'Aquamarine',
  nationality: '',
  type: 'drink',
  doneDate: '20/03/2023',
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
},
{
  id: '52775',
  alcoholicOrNot: '',
  category: 'Vegan',
  image: 'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
  name: 'Vegan Lasagna',
  nationality: 'Italian',
  type: 'meal',
  doneDate: '20/03/2023',
  tags: ['tag1', 'tag2', 'tag3', 'tag4'],
}];

const donePath = '/done-recipes';

describe('1. Testa o componente FavoriteRecipes', () => {
  afterEach(() => jest.resetAllMocks());

  it('1.2 Verifica o funcionamento do botão de filtro all', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(donePath));

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getAllByRole('img')).toHaveLength(7);
  });

  it('1.2 Verifica o funcionamento do botão de filtro por comida', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(donePath));

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });
});
