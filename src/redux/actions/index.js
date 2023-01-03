import fetchApiCoins from '../../service/fetchsApi';

export const SAVE_USER = 'SAVE_USER';
export const ACTION_CURRENCIE = 'ACTION_CURRENCIE';
export const ACTION_EXPENSES = 'ACTION_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_EDITED = 'SAVE_EDITED';

export const saveNewUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const actionCurrencie = (payload) => ({
  type: ACTION_CURRENCIE,
  payload,
});

export const actionExpenses = (payload) => ({
  type: ACTION_EXPENSES,
  payload,
});

export const deleteExpenses = (id, expenses) => ({
  type: DELETE_EXPENSES,
  payload: expenses.filter((expense) => expense.id !== id),
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  payload: id,
});

export const saveEditedExpenses = (edited, expenses) => ({
  type: SAVE_EDITED,
  payload: expenses.map((expense) => (
    expense.id === edited.id ? { ...expense, ...edited } : expense
  )),
});

export const fetchApiCurrency = () => async (dispatch) => {
  const saveApi = await fetchApiCoins();
  delete saveApi.USDT;
  const allCoins = Object.keys(saveApi);
  dispatch(actionCurrencie(allCoins));
};

export function fetchExpenses() {
  return async () => {
    const saveExpenses = await fetchApiCoins();
    delete saveExpenses.USDT;
    return saveExpenses;
  };
}
