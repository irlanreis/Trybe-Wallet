import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testes do componente "/table"', () => {
  it('Verifica se está sendo renderizado todos os componentes da tabela', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const table = screen.getByRole('table');
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const category = screen.getByRole('columnheader', { name: /tag/i });
    const payment = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByText(/valor:/i);
    const cambio = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const conversion = screen.getByRole('columnheader', { name: /valor convertido/i });
    const buttons = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    const currencyBR = screen.getByRole('columnheader', { name: /valor convertido/i });

    expect(table).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(conversion).toBeInTheDocument();
    expect(buttons).toBeInTheDocument();
    expect(currencyBR).toBeInTheDocument();
  });
  it('Verifica funcionalidades da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '21');

    const inputMethod = screen.getByTestId('method-input');
    userEvent.selectOptions(inputMethod, ['Cartão de débito']);

    const inputTag = screen.getByTestId('tag-input');
    userEvent.selectOptions(inputTag, ['Lazer']);

    const inputDescription = screen.getByTestId('description-input');
    userEvent.type(inputDescription, 'Lanche');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAdd);

    const tableDescription = await screen.findByRole('cell', { name: /lanche/i });
    expect(tableDescription).toBeInTheDocument();

    const tableTag = await screen.findByRole('cell', { name: /lazer/i });
    expect(tableTag).toBeInTheDocument();

    const tableMethod = await screen.findByRole('cell', { name: /cartão de débito/i });
    expect(tableMethod).toBeInTheDocument();

    const tableValue = await screen.findByRole('cell', { name: '21.00' });
    expect(tableValue).toBeInTheDocument();

    const tableCurrency = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(tableCurrency).toBeInTheDocument();

    const tableCambio = await screen.findByRole('cell', { name: /4\.75/i });
    expect(tableCambio).toBeInTheDocument();

    const tableValueConvert = await screen.findByRole('cell', { name: /99\.82/i });
    expect(tableValueConvert).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteBtn);

    expect(tableDescription).not.toBeInTheDocument();
    expect(tableTag).not.toBeInTheDocument();
    expect(tableMethod).not.toBeInTheDocument();
    expect(tableCurrency).not.toBeInTheDocument();
    expect(tableValue).not.toBeInTheDocument();
    expect(tableCambio).not.toBeInTheDocument();
    expect(tableValueConvert).not.toBeInTheDocument();
  });
});
