import axios from 'axios';
import actionTypes from '../constants/userConstants';

export function updateEmail(userId, email) {
  return dispatch => {
    return axios.patch(`/api/v1/users/${userId}`, email)
    .then(response => {
      if (valid(response)) {
        dispatch({ type: actionTypes.UPDATE_EMAIL, payload: response })
      }
      return response.data;
    });
  }
}

function valid(response) {
  return response.data.base === undefined;
}
