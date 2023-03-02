import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes na tela de Login', () => {
  it('Verifica se a tela possui os inputs necessários', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const pwInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();
  });

  it('Verifica se ao digitar o email e senha o botão de entrar é ativado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const pwInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(pwInput, '123456');

    waitFor(() => expect(enterBtn).toBeEnabled());
  });
});
