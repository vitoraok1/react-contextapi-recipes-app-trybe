import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const DRINK_NAME = 'Ordinary Drink';

describe('1. Testes no componente CategoryButtons', () => {
  it('1.2 Verifica se ao clicar em algum botão das categorias de Drinks, renderiza novos cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: DRINK_NAME }));
      expect(screen.getByRole('heading', { name: '3-Mile Long Island Iced Tea' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'All' }));
    });
  });
  it('1.3 Verifica se ao clicar novamnte em algum botão das categorias de Drinks, renderiza os cards iniciais', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: DRINK_NAME }));
      userEvent.click(screen.getByRole('button', { name: DRINK_NAME }));
      expect(screen.getByRole('heading', { name: 'GG' })).toBeInTheDocument();
    });
  });
  it('1.4 Verifica se ao clicar em algum botão das categorias de Meals, renderiza novos cards', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Chicken' }));
      expect(screen.getByRole('heading', { name: 'Ayam Percik' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'All' }));
    });
  });
  it('1.5 Verifica se ao clicar novamnte em algum botão das categorias de Meals, renderiza os cards iniciais', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Chicken' }));
      userEvent.click(screen.getByRole('button', { name: 'Chicken' }));
      expect(screen.getByRole('heading', { name: 'Corba' })).toBeInTheDocument();
    });
  });
  it('1.6 Verifica se ao clicar no botão "All" renderiza os cards iniciais', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'All' }));
      expect(screen.getByRole('heading', { name: 'Corba' })).toBeInTheDocument();
    });
  });
});
