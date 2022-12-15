import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    despesasTotais: 0,
    cambioUtilizado: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { despesasTotais, cambioUtilizado } = this.state;
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
