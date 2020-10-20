import axios from 'axios';
import { GET_TECHS, CURRENT_TECH, ERROR } from './types';

// Get all techs
export const getTechs = (studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/technician?fields=id, first_name, last_name, email`
    );
    dispatch({ type: GET_TECHS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.error.message,
        status: err.response.data.error.code,
      },
    });
  }
};

// get current tech by Email
export const getCurrentTech = (techEmail, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/technician?fields=*,*.*&filter[email]=${techEmail}`
    );
    let payload = res.data.data[0]
    payload.studioId = Number(studioId)
    dispatch({ type: CURRENT_TECH, payload });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.error.message,
        status: err.response.data.error.code,
      },
    });
  }
};
