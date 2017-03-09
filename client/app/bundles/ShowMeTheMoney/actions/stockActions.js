import axios from 'axios';
import actionTypes from '../constants/stockConstants';

export function getStockData(stockTicker) {
  return dispatch => {
    return axios.get(`/api/v1/stock_lookup?ticker=${stockTicker}`)
    .then(response => {
      dispatch({ type: actionTypes.GET_STOCK_DATA, response})
      },
    ).catch(function (error) {
      console.log(error);
    });
  }
}

