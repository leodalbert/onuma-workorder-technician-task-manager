import Cookies from 'js-cookie';
import { LOGIN_SUCCESS, LOGOUT, TOKEN } from './types';

// Login user and set cookie

export const login = (techEmail) => (dispatch) => {
  Cookies.set('tech', btoa(techEmail));
  dispatch({ type: LOGIN_SUCCESS, payload: techEmail });
};

// log out user and destroy cookie
export const logout = () => (dispatch) => {
  Cookies.remove('tech');
  dispatch({ type: LOGOUT });
};

// set email token
export const setToken = (token) => (dispatch) => {
  dispatch({ type: TOKEN, payload: token });
};
