import actionTypes from '../constants/userConstants';
import Immutable, { Map }from 'immutable';

export const $$initialState = Immutable.fromJS({
  user: Immutable.List
});

export default function userReducer($$state = $$initialState, action) {
  const { type, user } = action;

  switch (type) {
    case actionTypes.UPDATE_EMAIL:
      let newEmail = action.payload.data.email;

      return $$state.setIn(['user', 'email'], newEmail);
    default:
      return $$state;
  }
}

