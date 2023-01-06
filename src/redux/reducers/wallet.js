import {
  ACTION_CURRENCIE,
  SAVE_EDITED,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
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

  case EDIT_EXPENSES:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case SAVE_EDITED:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default reducerInicialWallet;
