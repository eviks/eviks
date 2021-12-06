import initialState from './initialStates/userInitialState';
import { GET_USER, USER_ERROR } from '../actions/types';

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return { ...state, ...payload };
    case USER_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default userReducer;
