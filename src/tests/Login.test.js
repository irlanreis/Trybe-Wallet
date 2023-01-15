import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(button.disabled).toBe(false);
    expect(history.location.pathname).toBe('/carteira');
  });
});
