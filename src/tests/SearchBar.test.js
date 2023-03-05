import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Testes no componente SearchBar', () => {
  it('1.2 Verifica se ao clicar no ícone de pesquisa é aberto o menu referente', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
      expect(screen.getByPlaceholderText(/search\.\.\./i)).toBeInTheDocument();
    });
  });

  it('1.3 Verifica se é possível fazer a pesquisa pelo filtro de Ingredientes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
      userEvent.click(screen.getByRole('radio', {
        name: /ingredientes/i,
      }));
      userEvent.type(screen.getByRole('textbox'), 'vodka');
      userEvent.click(screen.getByRole('button', {
        name: /pesquisar/i,
      }));
      expect(screen.getByRole('heading', {
        name: /155 belmont/i,
      })).toBeInTheDocument();
    });
  });
});
