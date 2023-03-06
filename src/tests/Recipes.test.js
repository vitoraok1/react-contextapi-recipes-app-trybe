import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('1. Testes no componente Recipes', () => {
  it('1.2 Verifica se na tela de Drinks possui os cards', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(16));
  });
  it('1.3 Verifica se na tela de Meals possui os cards', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(16));
  });
});
