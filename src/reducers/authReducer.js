import Cookies from 'js-cookie';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  TOKEN,
  AUTH_LOADING,
  REDIRECT_LOGIN,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  authLoading: true,
  user: '',
  token: null,
  redirect: '',
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
      Cookies.remove('onumaLocal');
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
    case REDIRECT_LOGIN:
      return {
        ...state,
        redirect: payload,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    default:
      return state;
  }
}
