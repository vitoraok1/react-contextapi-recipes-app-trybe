import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';

const DRINK_NAME = 'Ordinary Drink';

describe('1. Testes no componente CategoryButtons', () => {
  afterEach(() => jest.clearAllMocks());

  it('1.2 Verifica se ao clicar em algum botão das categorias de Drinks, renderiza novos cards', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(await screen.findByRole('button', { name: DRINK_NAME }));
    expect(await screen.findByRole('heading', { name: '3-Mile Long Island Iced Tea' })).toBeInTheDocument();
  });

  it('1.3 Verifica se ao clicar novamente em algum botão das categorias de Drinks, renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(await screen.findByRole('button', { name: DRINK_NAME }));
    userEvent.click(await screen.findByRole('button', { name: DRINK_NAME }));
    expect(await screen.findByRole('heading', { name: 'GG' })).toBeInTheDocument();
  });

  it('1.4 Verifica se ao clicar em algum botão das categorias de Meals, renderiza novos cards', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(await screen.findByRole('button', { name: 'Dessert' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: 'All' }));
  });

  it('1.5 Verifica se ao clicar novamente em algum botão das categorias de Meals, renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(await screen.findByRole('button', { name: 'Chicken' }));
    userEvent.click(await screen.findByRole('button', { name: 'Breakfast' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.6 Verifica se ao clicar no botão "All" renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(await screen.findByRole('button', { name: 'Dessert' }));
    expect(await screen.findByRole('heading', { name: 'Apam balik' })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: 'All' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.7 Verifica se a API é chamada na página Drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndContext(<App />, '/drinks');

    await waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    });
  });
});
