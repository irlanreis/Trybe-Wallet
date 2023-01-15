import {
  ACTION_CURRENCIE,
  DELETE_EXPENSES,
  SAVE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  ids: 0,
};

const reducerInicialWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_CURRENCIE:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
      ids: state.ids + 1,
    };

  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default reducerInicialWallet;
