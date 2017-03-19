import actionTypes from '../constants/stockConstants';
import Immutable, { Map }from 'immutable';

export const $$initialState = Immutable.fromJS({
  stocks: Immutable.List
});

export default function stocksReducer($$state = $$initialState, action) {
  const { type, stocks } = action;

  switch (type) {
    case actionTypes.ADD_STOCK:
      if (action.response.data.id !== undefined) {
        let stock = action.response.data;
        stock.stock_data = Map(stock.stock_data);

        let stockList = $$state.get('stocks').push(Map(stock));
        return $$state.set('stocks', stockList);
      }
    case actionTypes.REMOVE_STOCK:
      let stockId = action.response.data;
      let stockList = $$state.get('stocks');
      let stockIndex = stockList.findIndex(stock => { return stock.get('id') === stockId });
      let updatedStockList = stockList.delete(stockIndex);

      return $$state.set('stocks', updatedStockList);
    default:
      return $$state;
  }
}

