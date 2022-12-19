import fetchApiCoins from '../../service/fetchsApi';

export const SAVE_USER = 'SAVE_USER';
export const ACTION_CURRENCIE = 'ACTION_CURRENCIE';
export const ACTION_EXPENSES = 'ACTION_EXPENCES';

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
