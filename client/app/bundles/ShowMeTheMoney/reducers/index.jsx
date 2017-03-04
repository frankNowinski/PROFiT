import stocksReducer from './stocksReducer';
import { $$initialState as $$stocksState } from './stocksReducer';

export default {
  $$stocksStore: stocksReducer
};

export const initialStates = {
  $$stocksState,
};
