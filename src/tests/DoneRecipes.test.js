import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('1. Testes no componente DoneRecipes', () => {
  it('1.2 Verifica se a tela possui o título referente', () => {
    renderWithRouterAndContext(<App />, '/done-recipes');

    expect(screen.getByRole('heading', {
      name: /done recipes/i,
    })).toBeInTheDocument();
  });
});
