import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

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

  it('Verifica se todos os itens do formulário são renderizados corretamente', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const value = screen.getByText(/valor:/i);
    const description = screen.getByRole('textbox', { name: /descrição/i });
    const currency = screen.getByText(/moeda:/i);
    const payment = screen.getByText(/método de pagamento/i);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe('Testes do componente "/carteira"', () => {
  it('Verifica se as moedas são renderizadas corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const coinInput = screen.getByTestId('currency-input');

    waitFor(() => {
      const optionCoins = within(coinInput).getAllByRole('option');
      const optionsCoinValue = optionCoins.map((optionCoin) => optionCoin.value);
      const coins = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
        'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];
      expect(optionsCoinValue).toEqual(coins);
    });
  });

  it('Verifica se ao preencher uma despesa ela é renderizada na tela', async () => {
    const { store } = renderWithRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '123');
    userEvent.type(description, 'Cinema');
    userEvent.type(currency, 'ARS');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Lazer');
    userEvent.click(button);

    within(() => {
      const tableDescription = screen.getByRole('cell', { name: /Cinema/i });
      const tableConversion = screen.getByRole('cell', { name: /r\$3\.80/i });
      const tableCurrency = screen.getByRole('cell', { name: /peso argentino\/real brasileiro/i });
      const total = screen.getAllByTestId('total-field');

      expect(total).toHaveTextContent('3,80');
      expect(tableDescription).toBeInTheDocument();
      expect(tableConversion).toBeInTheDocument();
      expect(tableCurrency).toBeInTheDocument();
      expect(store.getState().wallet.expenses.value).toBe('123');
    });
  });
});
