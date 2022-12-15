import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SAVE_USER } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    senha: '',
    isButtonDisable: false,
  };

  validInputs = () => {
    const { email, senha } = this.state;
    const lengthPassword = 6;
    const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validateEmail = emailRegex.test(email);
    const validatePassword = senha.length >= lengthPassword;
    const isButtonDisable = validateEmail && validatePassword;
    this.setState({ isButtonDisable });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validInputs());
  };

  render() {
    const { isButtonDisable, senha, email } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              isRequired
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="senha"
              value={ senha }
              id="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <Link
            to="/carteira"
          >
            <button
              type="button"
              disabled={ !isButtonDisable }
              onClick={ () => dispatch({ type: SAVE_USER, payload: email }) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
