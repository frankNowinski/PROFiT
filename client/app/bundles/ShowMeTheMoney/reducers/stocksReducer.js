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

        let parsedStock = $$state.get('stocks').push(Map(stock));
        return $$state.set('stocks', parsedStock);
      }
    // case actionTypes.GET_STOCK_DATA:
      // return $$state.set('stockTicker', action.response.data);
    default:
      return $$state;
  }
}

