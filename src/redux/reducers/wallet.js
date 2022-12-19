import { ACTION_CURRENCIE, ACTION_EXPENSES } from '../actions';

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
  case ACTION_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default reducerInicialWallet;
