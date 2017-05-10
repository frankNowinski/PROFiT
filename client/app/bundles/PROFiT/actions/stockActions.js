import axios from 'axios';
import actionTypes from '../constants/stockConstants';
import fetchStock from '../utils/fetchStock';

export function addStock(stock) {
  let formattedStock = formatKeys(stock);

  return dispatch => {
    return axios.post('/api/v1/stocks', formattedStock)
    .then(response => {
      if (valid(response)) {
        dispatch({ type: actionTypes.ADD_STOCK, payload: response })
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
      if (valid(response)) {
        dispatch({ type: actionTypes.EDIT_STOCK, payload: response })
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
      if (valid(response)) {
        dispatch({ type: actionTypes.REMOVE_STOCK, payload: response })
      }
      return response.data;
    }).catch(error => {
      console.log(error);
    });
  }
}

export function fetchStockData(tickers) {
  return dispatch => {
    return fetchStock(tickers)
      .then(response => {
        dispatch({ type: actionTypes.FETCH_STOCK_DATA, payload: response })
      }).catch(error => {
        console.log(error);
      });
    };
}

function formatKeys(stock) {
  stock.purchased_date      = stock.purchasedDate;
  stock.purchased_price     = stock.purchasedPrice;
  stock.notify_email        = stock.notifyEmail;
  stock.notify_trend_change = stock.notifyTrendChange;

  return stock;
}

function valid(response) {
  return response.data.base === undefined
}
