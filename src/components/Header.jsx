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
        <div
          data-testid="email-field"
        >
          { email }
        </div>

        <div
          data-testid="total-field"
        >
          { despesasTotais }
        </div>

        <div
          data-testid="header-currency-field"
        >
          { cambioUtilizado }
        </div>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
