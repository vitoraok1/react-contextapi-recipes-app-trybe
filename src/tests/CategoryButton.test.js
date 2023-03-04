import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Testes no componente CategoryButtons', () => {
  it('1.2 Verifica se ao clicar em algum botão das categorias de Drinks, renderiza novos cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Ordinary Drink' }));
      expect(screen.getByRole('heading', { name: '3-Mile Long Island Iced Tea' })).toBeInTheDocument();
    });
  });
  it('1.3 Verifica se ao clicar em algum botão das categorias de Meals, renderiza novos cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Chicken' }));
      expect(screen.getByRole('heading', { name: 'Ayam Percik' })).toBeInTheDocument();
    });
  });
});
