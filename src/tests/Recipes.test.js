import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Testes no componente Recipes', () => {
  it('1.2 Verifica se na tela de Drinks possui os cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(16));
  });
  it('1.3 Verifica se na tela de Meals possui os cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(16));
  });
});
