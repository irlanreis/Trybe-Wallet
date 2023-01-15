import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, tableInfos } = this.props;
    dispatch(deleteExpenses(id, tableInfos));
  };

  render() {
    const { tableInfos } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            tableInfos.map((valorAtual) => (
              <tr key={ valorAtual.id }>
                <td>{valorAtual.description}</td>
                <td>{valorAtual.tag}</td>
                <td>{valorAtual.method}</td>
                <td>{(+valorAtual.value).toFixed(2)}</td>
                <td>{valorAtual.exchangeRates[valorAtual.currency].name}</td>
                <td>{(+valorAtual.exchangeRates[valorAtual.currency].ask).toFixed(2)}</td>
                <td>
                  {(+valorAtual.value * valorAtual
                    .exchangeRates[valorAtual.currency]
                    .ask).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(valorAtual.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  tableInfos: state.wallet.expenses,
});

Table.propTypes = {
  tableInfos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
