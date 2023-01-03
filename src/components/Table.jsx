import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
  tableInfos: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
