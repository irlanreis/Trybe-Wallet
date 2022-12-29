import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes da pagina "/login"', () => {
  it('Testes do Titulo da página', () => {
    renderWithRouterAndRedux(<App />);

    const titleLogin = screen.getByRole('heading', { name: /trybe wallet/i, level: 1 });

    expect(titleLogin).toBeInTheDocument();
    expect(titleLogin.innerHTML).toBe('Trybe Wallet');
  });

  it('Testes Input Email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');

    expect(inputEmail.type).toBe('email');
    expect(inputEmail).toBeInTheDocument();
  });

  it('Testes Input Password', () => {
    renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.type).toBe('password');
  });

  it('Testes do botão entrar e validação', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Entrar');
    expect(button.disabled).toBe(true);

    fireEvent.change(inputEmail, {
      target: {
        value: 'test@test.com',
      },
    });

    fireEvent.change(inputPassword, {
      target: {
        value: 'abcdef',
      },
    });

    userEvent.click(button);
    expect(button.disabled).toBe(false);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Testes da Página "/carteira"', () => {
  it('Testes da existência das informações no header', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(inputEmail, {
      target: {
        value: 'test@test.com',
      },
    });

    fireEvent.change(inputPassword, {
      target: {
        value: 'abcdef',
      },
    });

    userEvent.click(button);

    const email = screen.getByText(/test@test.com/i);
    const despesasTotais = screen.getByTestId('total-field');
    const coin = screen.getByText(/brl/i);

    expect(email).toBeInTheDocument();
    expect(despesasTotais).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
  });
});
