import axios from 'axios';
import actionTypes from '../constants/stockConstants';

export function addStock(stock) {
  stock.purchased_date = stock.purchasedDate;

  return dispatch => {
    return axios.post('/api/v1/stocks', stock)
    .then(response => {
      if (response.data.base === undefined) {
        dispatch({ type: actionTypes.ADD_STOCK, response })
      }
      return response.data;
    });
  }
}

export function editStock(stock) {
  let stockId = stock.stockId;
  stock.purchased_date = stock.purchasedDate;

  return dispatch => {
    return axios.patch(`/api/v1/stocks/${stockId}`, stock)
    .then(response => {
      if (response.data.base === undefined) {
        dispatch({ type: actionTypes.EDIT_STOCK, response })
      }
      return response.data;
    }).catch(error => {
      console.log(error);
    });
  }
}

export function removeStock(stockId) {
  return dispatch => {
    return axios.delete(`/api/v1/stocks/${stockId}`)
    .then(response => {
      if (response.data.base === undefined) {
        dispatch({ type: actionTypes.REMOVE_STOCK, response })
      }
      return response.data;
    }).catch(error => {
      console.log(error);
    });
  }
}

