import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  saveEditedExpenses,
  saveExpensesForm,
} from '../redux/actions';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: METHODS[0],
    tag: CATEGORIES[0],
  };

  createOptions = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, ids, editor, idToEdit, expenses } = this.props;

    const expensesInfos = {
      id: editor ? idToEdit : ids,
      value,
      description,
      currency,
      method,
      tag,
    };

    if (editor) {
      dispatch(saveEditedExpenses(expensesInfos, expenses));
    } else {
      dispatch(saveExpensesForm(expensesInfos));
    }
    this.setState({
      value: '',
      description: '',
      method: METHODS[0],
      tag: CATEGORIES[0],
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="input-value">
          Valor:
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="input-value"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            id="description"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="currency-input"
            data-testid="currency-input"
          >
            {this.createOptions(currencies)}
          </select>
        </label>

        <select
          name="method"
          value={ method }
          id="metodoPagamento"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          { this.createOptions(METHODS) }
        </select>

        <select
          name="tag"
          value={ tag }
          id="categoria"
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          { this.createOptions(CATEGORIES) }
        </select>

        <button type="submit">
          { editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
  ids: state.wallet.ids,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.instanceOf((Object)),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  ids: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
