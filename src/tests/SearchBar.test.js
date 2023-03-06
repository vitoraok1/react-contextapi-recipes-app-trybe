import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

describe('1. Testes no componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  it('1.2 Verifica se ao clicar no ícone de pesquisa é aberto o menu referente', () => {
    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    expect(screen.getByPlaceholderText(/search\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /ingredientes/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /nome/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /primeira letra/i,
    })).toBeInTheDocument();
  });

  it('1.3 Verifica se é possível filtrar e pesquisar por ingredientes', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /ingredientes/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'chicken');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /brown stew chicken/i,
    })).toBeInTheDocument());
  });

  it('1.4 Verifica se a mensagem de alerta aparece caso o usuário pesquise por duas letras com o checkbox "Primeira letra" selecionado', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'kk');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveTextContent('Your search must have only 1 (one) character');
    });
  });

  it('1.5 Verifica se a mensagem de alerta aparece caso o usuário pesquise por um nome que não existe', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    renderWithRouterAndContext(<App />, '/drinks');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /nome/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'xablau');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));

    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1));
  });

  it('1.6 Verifica se é possível pesquisar por nome na página de comidas e caso o retorno seja uma receita, redireciona para página de detalhes referente', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /nome/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'Corba');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));

    await (waitFor(() => expect(history.location.pathname).toBe('/meals/52977')));
  });

  it('1.7 Verifica se é possível pesquisar pela primeira letra na página de comidas', async () => {
    renderWithRouterAndContext(<App />, '/meals');

    userEvent.click(screen.getByRole('img', {
      name: /search/i,
    }));
    userEvent.click(screen.getByRole('radio', {
      name: /primeira letra/i,
    }));
    userEvent.type(screen.getByRole('textbox'), 'k');
    userEvent.click(screen.getByRole('button', {
      name: /pesquisar/i,
    }));

    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /kapsalon/i,
      }));
    });
  });
});
