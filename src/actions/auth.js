import Cookies from 'js-cookie';
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  TOKEN,
  AUTH_LOADING,
  LOGIN_FAIL,
  REDIRECT_LOGIN,
} from './types';

// Login user and set cookie

export const login = (techEmail) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: techEmail });
};

// log out user and destroy cookie
export const logout = () => (dispatch) => {
  Cookies.remove('onumaLocal');
  dispatch({ type: LOGOUT });
};

// set email token
export const setToken = (token) => (dispatch) => {
  dispatch({ type: TOKEN, payload: token });
};

export const sessionLogin = (studioId, techEmail, token, pathname) => async (
  dispatch
) => {
  dispatch({ type: AUTH_LOADING });
  try {
    const res = await axios.get(
      `/${studioId}/actions/start-technician-session?token=${token}&email=${techEmail}`
    );

    if (res.request.responseURL.includes('login')) {
      dispatch({ type: REDIRECT_LOGIN, payload: pathname });
    } else {
      Cookies.set('onumaLocal', btoa(JSON.stringify({ techEmail, token })));
      dispatch({ type: LOGIN_SUCCESS, payload: techEmail });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const sessionResume = (studioId, techEmail, token) => async (
  dispatch
) => {
  try {
    await axios.get(
      `/${studioId}/actions/start-technician-session?token=${token}&email=${techEmail}&resume=1`
    );
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};
