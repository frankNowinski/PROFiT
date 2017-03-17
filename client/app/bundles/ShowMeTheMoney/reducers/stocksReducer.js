import actionTypes from '../constants/stockConstants';
import Immutable, { Map }from 'immutable';

export const $$initialState = Immutable.fromJS({
  stocks: Immutable.List
});

export default function stocksReducer($$state = $$initialState, action) {
  const { type, stocks } = action;

  switch (type) {
    case actionTypes.ADD_STOCK:
      if (action.response.data !== null) {
        let stockList = $$state.get('stocks').push(Map(action.response.data));
        return $$state.set('stocks', stockList)
      }
    case actionTypes.GET_STOCK_DATA:
      return $$state.set('stockTicker', action.response.data);
    default:
      return $$state;
  }
}

