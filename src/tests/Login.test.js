import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const VALID_EMAIL = 'teste@teste.com';
const VALID_PW = '1234567';
const EMAIL_INPUT = 'email-input';
const PW_INPUT = 'password-input';
const ENTER_BTN = 'login-submit-btn';

describe('Testes na tela de Login', () => {
  it('Verifica se a tela possui os inputs necessários', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const pwInput = screen.getByTestId(PW_INPUT);
    const enterBtn = screen.getByTestId(ENTER_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();
  });

  it('Verifica se ao digitar o email e senha o botão de entrar é ativado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const pwInput = screen.getByTestId(PW_INPUT);
    const enterBtn = screen.getByTestId(ENTER_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(pwInput, VALID_PW);

    waitFor(() => expect(enterBtn).toBeEnabled());
  });

  it('Verifica se ao preencher os dados e clicar no botão "Enter" a rota é redirecionada para tela de Receitas', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const pwInput = screen.getByTestId(PW_INPUT);
    const enterBtn = screen.getByTestId(ENTER_BTN);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(pwInput, VALID_PW);
    userEvent.click(enterBtn);

    waitFor(() => expect(pathname).toEqual('/meals'));
  });

  it('Verifica se submeter as infos o email é salvo no localstorage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const pwInput = screen.getByTestId(PW_INPUT);
    const enterBtn = screen.getByTestId(ENTER_BTN);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(pwInput, 'VALID_PW');
    userEvent.click(enterBtn);

    waitFor(() => expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: VALID_EMAIL })));
  });
});
