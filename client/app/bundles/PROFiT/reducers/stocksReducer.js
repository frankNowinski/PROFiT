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

        return $$state.update('stocks', stocks => stocks.push(Map(stock)));
      }
    case actionTypes.EDIT_STOCK:
      let updatedStock = action.response.data;
      updatedStock.stock_data = Map(updatedStock.stock_data);

      const index = $$state.get('stocks').findIndex(stock => {
        return stock.get('id') === updatedStock.id;
      });

      return $$state.setIn(['stocks', index], Map(updatedStock));
    case actionTypes.REMOVE_STOCK:
      let stockId = action.response.data;
      let stockList = $$state.get('stocks').filter(stock => {
        return stock.get('id') !== stockId;
      });

      return $$state.set('stocks', stockList);
    default:
      return $$state;
  }
}

