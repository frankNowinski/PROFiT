import axios from 'axios';
import actionTypes from '../constants/stockConstants';


// export function getStockData(ticker) {
  // return dispatch => {
    // return axios.get(url)
    // .then(response => {
      // dispatch({ type: actionTypes.GET_STOCK_DATA, stockData })
    // }).catch(function (error) {
      // console.log('Error getting stock data: ' + error);
    // });
  // }
// }

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
