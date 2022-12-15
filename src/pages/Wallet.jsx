import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return <div>TrybeWallet</div>;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Wallet);
