import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('1. Testes no componente Footer', () => {
  it('1.2 Verifica se os icones estão presentes no final da pagina', async () => {
    renderWithRouterAndContext(<App />, '/profile');

    expect(await screen.findByRole('img', {
      name: /drink icon/i,
    })).toBeInTheDocument();
    expect(await screen.findByRole('img', {
      name: /meal icon/i,
    })).toBeInTheDocument();
  });

  it('1.3 Verifica se o botão Drinks encaminha para a rota "/drinks"', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    userEvent.click(await screen.findByRole('img', {
      name: /drink icon/i,
    }));
    expect(history.location.pathname).toBe('/drinks');
  });

  it('1.4 Verifica se o botão Meals encaminha para a rota "/meals"', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');

    userEvent.click(await screen.findByRole('img', {
      name: /meal icon/i,
    }));
    expect(history.location.pathname).toBe('/meals');
  });
});
