import fetchApiCoins from '../../service/fetchsApi';

export const SAVE_USER = 'SAVE_USER';
export const ACTION_CURRENCIE = 'ACTION_CURRENCIE';

export const saveNewUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const actionCurrencie = (payload) => ({
  type: ACTION_CURRENCIE,
  payload,
});

export const fetchApiCurrency = () => async (dispatch) => {
  const saveApi = await fetchApiCoins();
  delete saveApi.USDT;
  const allCoins = Object.keys(saveApi);
  dispatch(actionCurrencie(allCoins));
};
