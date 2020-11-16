import axios from 'axios';

import {
  GET_WORKORDER_STATUS_INFO,
  SET_SPACE_INFO_STATUS,
  ERROR,
  SET_STUDIO,
} from './types';

// Get floor 0 id of building
export const getFloorId = (buildingId, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/building?filter[id]=${buildingId}&fields=floors.id`
    );
    dispatch({
      type: SET_SPACE_INFO_STATUS,
      payload: { floorId: res.data.data[0].floors[0].id },
    });
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

// Get Work order status details by work order Id
export const getWorkOrderStatusInfo = (workorderId, studioId) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder/${workorderId}?fields=id,request_number,request_description,assigned_priority,status,status_modification_date,building.site,building.id,building.name,building.number,floor.id,floor.number, floor.name,space.id,space.name,space.number,assigned_technician.id,assigned_technician.first_name,assigned_technician.last_name,assigned_technician.email,administrator_to_technician_comment,administrator_comment,location_description`
    );

    const workorder = res.data.data;
    // create object with buidling info if availible
    let buildingInfo = {};
    buildingInfo.siteId = workorder.building.site;
    buildingInfo.buildingId = workorder.building.id;
    buildingInfo.buildingName = workorder.building.name;

    if (workorder.space) {
      buildingInfo.spaceId = workorder.space.id;
      buildingInfo.spaceName = workorder.space.name;
      buildingInfo.spaceNumber = workorder.space.number;
    }
    if (workorder.floor) {
      buildingInfo.floorId = workorder.floor.id;
      buildingInfo.floorName = workorder.floor.name;
      buildingInfo.floorNumber = workorder.floor.number;
    } else {
      dispatch(getFloorId(buildingInfo.buildingId, studioId));
    }
    dispatch({ type: SET_SPACE_INFO_STATUS, payload: buildingInfo });

    dispatch({ type: GET_WORKORDER_STATUS_INFO, payload: workorder });
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

// Set Stuido and email to state from url params
export const setStudio = (studio, email) => (dispatch) => {
  dispatch({ type: SET_STUDIO, payload: { studio, email } });
};
