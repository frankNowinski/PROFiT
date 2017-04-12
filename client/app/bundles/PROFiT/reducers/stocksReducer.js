import actionTypes from '../constants/stockConstants';
import Immutable, { Map, List }from 'immutable';

export const $$initialState = Immutable.fromJS({
  stocks: Immutable.List
});

export default function stocksReducer($$state = $$initialState, action) {
  const { type, stocks } = action;

  switch (type) {
    case actionTypes.ADD_STOCK:
      let stock = action.payload.data;
      stock.stock_data = Map(stock.stock_data);

      return $$state.update('stocks', stocks => stocks.push(Map(stock)));
    case actionTypes.EDIT_STOCK:
      let updatedStock = action.payload.data;
      updatedStock.stock_data = Map(updatedStock.stock_data);

      const index = $$state.get('stocks').findIndex(stock => {
        return stock.get('id') === updatedStock.id;
      });

      return $$state.setIn(['stocks', index], Map(updatedStock));
    case actionTypes.REMOVE_STOCK:
      let stockId = action.payload.data;
      let stockList = $$state.get('stocks').filter(stock => {
        return stock.get('id') !== stockId;
      });

      return $$state.set('stocks', stockList);
    case actionTypes.FETCH_STOCK_DATA:
      let allStockData = action.payload;
      let allStocks    = [];

      for(let i = 0; i < allStockData.length; i++) {
        let currentStock = $$state.getIn(['stocks', i]) || false;
        let stockData    = allStockData[i];
        let previousTime = currentStock.getIn(['stock_data', 'LastTradeTime']);
        let previousDate = currentStock.getIn(['stock_data', 'LastTradeDate']);
        let currentTime  = stockData['LastTradeTime'];
        let currentDate  = stockData['LastTradeDate'];

        if (currentDate >= previousDate && currentTime > previousTime) {
          allStocks.push(currentStock.set('stock_data', Map(stockData)));
        } else {
          allStocks.push(currentStock);
        }
      }

      return $$state.set('stocks', List(allStocks));
    default:
      return $$state;
  }
}

