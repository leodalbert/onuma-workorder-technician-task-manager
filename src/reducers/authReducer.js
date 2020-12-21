import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, TOKEN } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  authLoading: true,
  user: '',
  token: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        authLoading: false,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: '',
        authLoading: false,
      };
    case TOKEN:
      return {
        ...state,
        token: payload,
      };
    default:
      return state;
  }
}
