import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const BUTTON_PROFILE = 'profile-top-btn';
const BUTTON_SEARCH = 'search-top-btn';
const FAVORITE_LINK = '/favorite-recipes';
const DRINKS_LINK = '/drinks';

describe('1. Testes no componente Header', () => {
  it('1.2 Verifica se a tela refeições favoritas possui o nome da página', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(FAVORITE_LINK);

    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' }))
      .toBeInTheDocument());
  });
  it('1.3 Verifica se o botão profile muda pra pagina do perfil', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(FAVORITE_LINK));

    const buttonProfile = screen.getByTestId(BUTTON_PROFILE);
    userEvent.click(buttonProfile);

    expect(screen.getByRole('heading', { level: 1, name: 'Profile' }))
      .toBeInTheDocument();
  });
  it('1.4 Verifica se a página Drinks possui o botão seachbar', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(DRINKS_LINK));

    const profileButton = screen.getByTestId(BUTTON_PROFILE);
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.getByTestId(BUTTON_SEARCH);

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Drinks');

    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    waitFor(() => expect(buttonSearch).not.toBeInTheDocument());
  });
});
