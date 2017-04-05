import stocksReducer from './stocksReducer';
import userReducer from './userReducer';

import { $$initialState as $$stocksState } from './stocksReducer';
import { $$initialState as $$userState } from './userReducer';

export default {
  $$stocksStore: stocksReducer
};

export const initialStates = {
  $$stocksState,
  $$userState
};
