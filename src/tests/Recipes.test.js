import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('1. Testes no componente Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1.2 Verifica se na tela de Meals possui os cards', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Corba')).toBeInTheDocument();
    });
  });
  it('1.2 Verifica se na tela de Drinks possui os cards', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Adam')).toBeInTheDocument();
    });
  });
});
