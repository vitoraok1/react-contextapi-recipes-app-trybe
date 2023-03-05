import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const DRINK_ID = 'drinks-bottom-btn';
const MEAL_ID = 'meals-bottom-btn';

describe('1. Testes no componente Footer', () => {
  it('1.2 Verifica se os icones estão presentes no final da pagina', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    await waitFor(() => {
      const drinkButton = screen.getByTestId(DRINK_ID);
      const mealButton = screen.getByTestId(MEAL_ID);
      expect(drinkButton).toBeInTheDocument();
      expect(mealButton).toBeInTheDocument();
    });
  });
  it('1.3 Verifica se o botão Drinks encaminha para a rota "/drinks"', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/profile'));

    await waitFor(() => {
      const drinkButton = screen.getByTestId(DRINK_ID);
      userEvent.click(drinkButton);
      expect(screen.getByRole('heading', {
        name: /drinks/i,
      })).toBeInTheDocument();
    });
  });
  it('1.4 Verifica se o botão Meals encaminha para a rota "/drinks"', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/profile'));

    await waitFor(() => {
      const mealButton = screen.getByTestId(MEAL_ID);
      userEvent.click(mealButton);
      expect(screen.getByRole('heading', {
        name: /meals/i,
      })).toBeInTheDocument();
    });
  });
});
