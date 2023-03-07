import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealsCategories from '../../cypress/mocks/mealCategories';
import App from '../App';

const DRINK_NAME = 'Ordinary Drink';

describe('1. Testes no componente CategoryButtons', () => {
  beforeEach(jest.restoreAllMocks);

  it('1.2 Verifica se os botões das categorias de Comidas, renderiza novos cards', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    // await waitFor(() => {
    //   expect(screen.getByRole('button', {
    //     name: /beef/i,
    //   })).toBeInTheDocument();
    //   userEvent.click(screen.getByRole('button', {
    //     name: /beef/i,
    //   }));
    //   expect(screen.getByRole('heading', {
    //     name: /beef and mustard pie/i,
    //   })).toBeInTheDocument();
    // });

    expect(await screen.findByRole('button', {
      name: /beef/i,
    })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', {
      name: /beef/i,
    }));
    expect(await screen.findByRole('heading', {
      name: /beef and mustard pie/i,
    })).toBeInTheDocument();
  });

  it('1.3 Verifica se ao clicar em algum botão das categorias de Bebidas, renderiza novos cards', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    expect(await screen.findByRole('button', {
      name: /shake/i,
    })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', {
      name: /shake/i,
    }));
    expect(await screen.findByRole('heading', {
      name: /151 florida bushwacker/i,
    })).toBeInTheDocument();
  });

  it('1.4 Verifica se ao clicar novamente em algum botão das categorias de Bebidas, renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(await screen.findByRole('button', { name: DRINK_NAME }));
    userEvent.click(await screen.findByRole('button', { name: DRINK_NAME }));
    expect(await screen.findByRole('heading', { name: 'GG' })).toBeInTheDocument();
  });

  it('1.5 Verifica se ao clicar novamente em algum botão das categorias de Comidas, renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(await screen.findByRole('button', { name: 'Chicken' }));
    userEvent.click(await screen.findByRole('button', { name: 'Breakfast' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.6 Verifica se ao clicar no botão "All" na página de Comidas renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(await screen.findByRole('button', { name: 'Dessert' }));
    expect(await screen.findByRole('heading', { name: 'Apam balik' })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: 'All' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.6 Verifica se ao clicar no botão "All" na página de Bebidas renderiza os cards iniciais', async () => {
    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(await screen.findByRole('button', { name: 'Dessert' }));
    expect(await screen.findByRole('heading', { name: 'Apam balik' })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: 'All' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.7 Verifica se a API é chamada na página Bebidas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    renderWithRouterAndContext(<App />, '/drinks');

    await waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledTimes(2);
      expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    });
  });

  it('1.7 Verifica se a API é chamada na página Comidas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsCategories),
    });

    renderWithRouterAndContext(<App />, '/meals');

    await waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledTimes(2);
      expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    });
  });
});
