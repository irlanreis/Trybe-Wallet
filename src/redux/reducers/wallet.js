import { ACTION_CURRENCIE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const reducerInicialWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_CURRENCIE:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default reducerInicialWallet;
