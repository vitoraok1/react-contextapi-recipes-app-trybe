import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('1. Testes no componente CategoryButtons', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1.2 Verifica se os botões das categorias de Comidas, renderiza novos cards', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /beef/i,
      })).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', {
        name: /beef/i,
      }));
      expect(screen.getByRole('heading', {
        name: /beef and mustard pie/i,
      })).toBeInTheDocument();
    });

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
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

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
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(await screen.findByRole('button', {
      name: /ordinary drink/i,
    }));
    userEvent.click(await screen.findByRole('button', {
      name: /ordinary drink/i,
    }));
    expect(await screen.findByRole('heading', { name: 'AT&T' })).toBeInTheDocument();
  });

  it('1.5 Verifica se ao clicar novamente em algum botão das categorias de Comidas, renderiza os cards iniciais', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(await screen.findByRole('button', { name: 'Chicken' }));
    userEvent.click(await screen.findByRole('button', { name: 'Breakfast' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.6 Verifica se ao clicar no botão "All" na página de Comidas renderiza os cards iniciais', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(await screen.findByRole('button', { name: 'Chicken' }));
    expect(await screen.findByRole('heading', { name: 'Brown Stew Chicken' })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: 'All' }));
    expect(await screen.findByRole('heading', { name: 'Corba' })).toBeInTheDocument();
  });

  it('1.7 Verifica se ao clicar no botão "All" na página de Bebidas renderiza os cards iniciais', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(await screen.findByRole('button', { name: 'Ordinary Drink' }));
    expect(await screen.findByRole('heading', { name: '50/50' })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('button', { name: 'All' }));
    expect(await screen.findByRole('heading', { name: 'A1' })).toBeInTheDocument();
  });

  it('1.8 Verifica se é possível pesquisar por nome na página de Comidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /nome/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'soup');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));
    expect(await screen.findByRole('heading', { name: 'Leblebi Soup' })).toBeInTheDocument();
  });

  it('1.9 Verifica se é possível pesquisar por nome na página de Comidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /nome/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'gin');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));
    expect(await screen.findByRole('heading', { name: 'Gin Fizz' })).toBeInTheDocument();
  });

  it('1.10 Verifica se a API é chamada na página Bebidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('1.11 Verifica se a API é chamada na página Comidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
