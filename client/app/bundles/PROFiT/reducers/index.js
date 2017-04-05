import stocksReducer, { $$initialState as $$stocksState } from './stocksReducer';
import userReducer, { $$initialState as $$userState } from './userReducer';

export default {
  $$stocksStore: stocksReducer,
  $$userStore: userReducer
};

export const initialStates = {
  $$stocksState,
  $$userState
};
