import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const BUTTON_PROFILE = 'profile-top-btn';
const BUTTON_SEARCH = 'search-top-btn';
const PAGE_TITLE = 'page-title';

describe('1. Testes no componente Header', () => {
  it('1.1 Verifica se a tela refeições possui os botões profile e search e nome da página', () => {
    renderWithRouter(<Meals />);

    const buttonProfile = screen.getByTestId(BUTTON_PROFILE);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);
    const pageTitle = screen.getByTestId(PAGE_TITLE);

    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    waitFor(() => expect(pageTitle).toHaveTextContent('Meals'));
  });
  it('1.2 Verifica se a tela refeições favoritas possui o nome da página', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const { pathname } = history.location;

    const buttonProfile = screen.getByTestId(BUTTON_PROFILE);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);

    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    waitFor(() => expect(pathname).toEqual('/favorite-recipes'));
    waitFor(() => expect(screen.getByTestId(PAGE_TITLE)).toHaveTextContent('Favorite Recipes'));
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
  it('1.5 Verifica se a tela profile abre a partir da tela refeições favoritas', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const { pathname } = history.location;

    const buttonProfile = screen.getByTestId(BUTTON_PROFILE);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);

    expect(buttonProfile).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    waitFor(() => expect(pathname).toEqual('/favorite-recipes'));
    waitFor(() => expect(screen.getByText('Favorite Recipes')).toBeInTheDocument());
    userEvent.click(buttonProfile);

    waitFor(() => expect(pathname).toEqual('/profile'));
  });
});
