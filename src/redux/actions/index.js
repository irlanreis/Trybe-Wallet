import fetchApiCoins from '../../service/fetchsApi';

export const SAVE_USER = 'SAVE_USER';
export const ACTION_CURRENCIE = 'ACTION_CURRENCIE';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_EDITED = 'SAVE_EDITED';
export const keys = (obj) => Object.keys(obj);

export const saveNewUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const actionCurrencie = (currencies) => ({
  type: ACTION_CURRENCIE,
  payload: keys(currencies).filter((currencie) => currencie !== 'USDT'),
});

export const deleteExpenses = (id, expenses) => ({
  type: DELETE_EXPENSES,
  payload: expenses.filter((expense) => expense.id !== id),
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  payload: id,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const saveEditedExpenses = (edited, expenses) => ({
  type: SAVE_EDITED,
  payload: expenses.map((expense) => (
    expense.id === edited.id ? { ...expenses, ...edited } : expense
  )),
});

export const saveExpensesForm = (expensesInfos) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => { delete data.USDT; return data; })
    .then((data) => dispatch(saveExpenses({
      ...expensesInfos,
      exchangeRates: data,
    })))
    .catch((error) => console.log(error));
};

export const fetchApiCurrency = () => async (dispatch) => {
  const saveApi = await fetchApiCoins();
  delete saveApi.USDT;
  const allCoins = Object.keys(saveApi);
  dispatch(actionCurrencie(allCoins));
};

export const fetchApiCurrency2 = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(actionCurrencie(data)))
    .catch((error) => console.log(error));
};

export function fetchExpenses() {
  return async () => {
    const savedExpenses = await fetchApiCoins();
    delete savedExpenses.USDT;
    return savedExpenses;
  };
}
