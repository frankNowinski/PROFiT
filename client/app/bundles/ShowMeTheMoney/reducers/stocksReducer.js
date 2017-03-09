import Immutable from 'immutable';

import actionTypes from '../constants/stockConstants';

export const $$initialState = Immutable.fromJS({
  stocks: ''
});

export default function stocksReducer($$state = $$initialState, action) {
  const { type, stocks } = action;

  switch (type) {
    case actionTypes.GET_STOCK_DATA:
      return $$state.set('stockTicker', action.response.data);
    default:
      return $$state;
  }
}

