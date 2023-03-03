import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import App from '../App';

const BUTTON_PROFILE = 'profile-top-btn';
const BUTTON_SEARCH = 'search-top-btn';
const FAVORITE_LINK = '/favorite-recipes';

describe('1. Testes no componente Header', () => {
  it('1.2 Verifica se a tela refeições favoritas possui o nome da página', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(FAVORITE_LINK);

    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' }))
      .toBeInTheDocument());
  });
  it('1.3 Verifica se o botão profile muda pra pagina do perfil', () => {
    const { history } = renderWithRouter(<Meals />);
    const { pathname } = history.location;

    const buttonProfile = screen.getByTestId(BUTTON_PROFILE);
    userEvent.click(buttonProfile);

    waitFor(() => expect(pathname).toEqual('/profile'));
  });
  it('1.4 Verifica se o botão search abre a search bar', () => {
    renderWithRouter(<Meals />);

    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    waitFor(() => expect(buttonSearch).not.toBeInTheDocument());
  });
});
