import axios from 'axios';
import { GET_TECHS, CURRENT_TECH, ERROR } from './types';

// Get all techs
export const getTechs = (studioId, siteGroup) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/technician?filter[site_group.id]=${siteGroup}&fields=id,first_name,last_name,email`
    );
    dispatch({ type: GET_TECHS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        msg: err.response.data.err.message,
        status: err.response.data.err.code,
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
    if (res.data.data.length === 0) {
      dispatch({
        type: ERROR,
        payload: {
          msg: `No technician found with email address: ${techEmail}`,
          status: 404,
        },
      });
    } else {
      let payload = res.data.data[0];
      payload.studioId = Number(studioId);
      dispatch({ type: CURRENT_TECH, payload: payload });
    }
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: ERROR,
    //   payload: {
    //     msg: err.response.data.err.message,
    //     status: err.response.data.err.code,
    //   },
    // });
  }
};
