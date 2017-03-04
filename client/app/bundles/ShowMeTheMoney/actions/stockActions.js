import actionTypes from '../constants/stockConstants';

export function updateStockTicker(stockTicker) {
  return {
    type: actionTypes.UPDATE_STOCK_TICKER,
    stockTicker
  };
}

