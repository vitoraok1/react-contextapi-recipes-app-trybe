import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const localStorageMock = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  id: '178319',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  name: 'Aquamarine',
  nationality: '',
  type: 'drink',
},
{
  id: '52775',
  alcoholicOrNot: '',
  category: 'Vegan',
  image: 'https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg',
  name: 'Vegan Lasagna',
  nationality: 'Italian',
  type: 'meal',
}];

const favoritePath = '/favorite-recipes';

describe('1. Testes no componente FavoriteRecipes', () => {
  afterEach(() => jest.resetAllMocks());
  it('1.2 Verifica o localStorage corresponde ao mock', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    renderWithRouter(<App />, [favoritePath]);

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(localStorageMock);
  });

  it('1.3 Verifica se o componente possui o botão de filtro geral', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));

    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(favoritePath);
    });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  });

  it('1.4 Verifica se o componente possui o botão de filtro por comida', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(favoritePath);
    });

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('1.5 Verifica se o componente possui o botão de filtro por bebida', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
    const { history } = renderWithRouter(
      <App />,
    );

    act(() => {
      history.push(favoritePath);
    });

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});
