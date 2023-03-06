import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('1. Testes no componente Header', () => {
  afterEach(() => jest.clearAllMocks());
  it('1.2 Verifica se a tela refeições favoritas possui o nome da página', async () => {
    renderWithRouterAndContext(<App />, '/favorite-recipes');

    expect(await screen.findByRole('heading', { level: 1, name: 'Favorite Recipes' }))
      .toBeInTheDocument();
  });

  it('1.3 Verifica se o botão profile muda pra pagina do perfil', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    expect(await screen.findByRole('img', {
      name: /profile icon/i,
    })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('img', {
      name: /profile icon/i,
    }));
    expect(history.location.pathname).toBe('/profile');
    expect(await screen.findByRole('heading', { level: 1, name: 'Profile' }))
      .toBeInTheDocument();
  });

  it('1.4 Verifica se a página Drinks possui o botão seachbar', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    expect(await screen.findByRole('img', {
      name: /search/i,
    }));
    userEvent.click(await screen.findByRole('img', {
      name: /search/i,
    }));
    expect(await screen.findByRole('textbox')).toBeInTheDocument();
    expect(await screen.findAllByRole('radio')).toHaveLength(3);
    expect(await screen.findByRole('button', {
      name: /pesquisar/i,
    })).toBeInTheDocument();
  });
});
