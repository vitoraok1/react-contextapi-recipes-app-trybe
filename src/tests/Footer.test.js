import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

const DRINK_ID = 'drinks-bottom-btn';
const MEAL_ID = 'meals-bottom-btn';

describe('1. Testes no componente Footer', () => {
  it('1.2 Verifica se os icones estão presentes no final da pagina', async () => {
    renderWithRouter(<Drinks />);

    const drinkButton = screen.getByTestId(DRINK_ID);
    const mealButton = screen.getByTestId(MEAL_ID);

    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
  });
  it('1.3 Verifica se o botão Drinks encaminha para a rota "/drinks"', async () => {
    const { history } = renderWithRouter(<Profile />);
    const { pathname } = history.location;

    const drinkButton = screen.getByTestId(DRINK_ID);
    userEvent.click(drinkButton);
    waitFor(() => expect(pathname).toEqual('/drinks'));
  });
  it('1.4 Verifica se o botão Meals encaminha para a rota "/drinks"', async () => {
    const { history } = renderWithRouter(<Profile />);
    const { pathname } = history.location;

    const mealButton = screen.getByTestId(MEAL_ID);
    userEvent.click(mealButton);
    waitFor(() => expect(pathname).toEqual('/meal'));
  });
});
