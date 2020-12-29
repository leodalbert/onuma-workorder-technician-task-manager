import Cookies from 'js-cookie';
import axios from 'axios';
import { inDev } from '../utils/helpers';
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
export const logout = () => async (dispatch) => {
  await axios.get(`https://system.onuma.com/user/logout`);
  dispatch({ type: LOGOUT });
};

// set email token
export const setToken = (token) => (dispatch) => {
  dispatch({ type: TOKEN, payload: token });
};

// start Tech session
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
      // if in dev skip redirect auth flow
      if (inDev()) {
        Cookies.set('onumaLocal', btoa(JSON.stringify({ techEmail, token })));
        dispatch({ type: LOGIN_SUCCESS, payload: techEmail });
      }
    } else {
      Cookies.set('onumaLocal', btoa(JSON.stringify({ techEmail, token })));
      dispatch({ type: LOGIN_SUCCESS, payload: techEmail });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};
// start Requester session
export const sessionLoginRequester = (
  studioId,
  requesterEmail,
  token,
  id
) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    await axios.get(
      `/${studioId}/actions/start-requester-session?token=${token}&email=${requesterEmail}&workorder_id=${id}`
    );

    Cookies.set('onumaLocal', btoa(JSON.stringify({ requesterEmail, token })));
    dispatch({ type: LOGIN_SUCCESS, payload: requesterEmail });
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
