import axios from 'axios';
import actionTypes from '../constants/stockConstants';

export function getStockData(stockTicker) {
  return dispatch => {
    return axios.get(`/api/v1/stock_lookup?ticker=${stockTicker}`)
    .then(response => {
      dispatch({ type: actionTypes.GET_STOCK_DATA, response})
      }
    ).catch(function (error) {
      console.log(error);
    });
  }
}

export function addStock(stock) {
  stock.purchased_date = stock.purchasedDate;

  return dispatch => {
    return axios.post('/api/v1/stocks', stock)
    .then(response => {
      dispatch({ type: actionTypes.ADD_STOCK, response })
      }
    ).catch(error => {
      console.log(error);
    });
  }
}
