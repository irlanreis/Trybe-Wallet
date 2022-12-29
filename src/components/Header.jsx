import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    cambioUtilizado: 'BRL',
  };

  render() {
    const { email, expenses } = this.props;
    const { cambioUtilizado } = this.state;
    const despesasTotais = expenses
      .reduce((acc, curr) => acc + curr.value
       * curr.exchangeRates[curr.currency].ask, 0).toFixed(2);
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>

        <h3 data-testid="total-field">{ despesasTotais }</h3>

        <h3 data-testid="header-currency-field">{ cambioUtilizado }</h3>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  despesasTotais: PropTypes.number,
  cambioUtilizado: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
