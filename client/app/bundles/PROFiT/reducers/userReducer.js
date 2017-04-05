import Immutable, { Map }from 'immutable';

export const $$initialState = Immutable.fromJS({
  user: Immutable.Map
});

export default function stocksReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.UPDATE_EMAIL:
      return $$state;
    default:
      return $$state;
  }
}

