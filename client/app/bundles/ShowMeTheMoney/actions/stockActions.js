import axios from 'axios';
import actionTypes from '../constants/stockConstants';

export function getStockData(stockTicker) {
  return dispatch => {
    return axios.get('/api/v1/stock_lookup', { params: { stockTicker: stockTicker } })
    .then(response => {
      dispatch({ type: 'GET_STOCK_DATA', response})
      },
    ).catch(function (error) {
      console.log(error);
    });
  }}

export function updateStockTicker(stockTicker) {
  return {
    type: actionTypes.UPDATE_STOCK_TICKER,
    stockTicker
  }
}

