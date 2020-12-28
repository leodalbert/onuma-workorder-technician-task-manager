import axios from 'axios';
import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  GET_WORK_ORDER_TECH,
  ERROR,
  SET_LOADING,
  CLEAR_CURRENT,
  CLEAR_COMPONENT_STATE,
  CHANGE_WORKORDER_STATUS,
  SET_SPACE_INFO,
  ADD_COLLABORATOR,
  REMOVE_COLLABORATOR,
  GET_WORKORDER_FILES,
  ADD_WORKORDER_FILE,
  SEND_COMMENT_TO_REQUESTOR,
  DELETE_ATTACHMENT,
} from './types';

// Get all work orders by tech Id
export const getAllWorkOrders = (techId, studioId) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder?fields=id,request_number,request_date,request_description,request_number,building,assigned_priority,space,assigned_technician,status,collaborators.collaborator&filter[collaborators.collaborator][in]=${techId}&filter[assigned_technician.id][in]=${techId}&filter[assigned_technician.id][logical]=or`
    );
    dispatch({ type: GET_TECHS_WORK_ORDERS, payload: res.data.data });
    // console.log(res.data.data);
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

// Get floor 0 id of building
export const getFloorId = (buildingId, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/building?filter[id]=${buildingId}&fields=floors.id`
    );
    console.log(res);
    dispatch({
      type: SET_SPACE_INFO,
      payload: { floorId: res.data.data[0].floors[0].id },
    });
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

// Get Work order by work order Id
export const getWorkOrder = (workorderId, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder/${workorderId}?&fields=*,*.*,id,status,token,request_number,building.id,building.site,building.number,building.name,floor.name,floor.id,floor.number,space.id,space.number,space.name,submitted_by,request_email,assigned_priority,request_date,request_description,components.component,components.id,tasks.*,assigned_technician.id,assigned_technician.first_name,assigned_technician.last_name,assigned_technician.email,location_description,request_telephone,due_date,administrator_to_technician_comment,administrator_comment,collaborators.collaborator,collaborators.id,assigned_trade,collaborators.collaborator.email,collaborators.collaborator.id,request_email_cc,preventive_maintenance,maintenance_procedures`
    );
    let workorder = res.data.data;

    // create object with buidling info if availible
    let buildingInfo = {};
    buildingInfo.siteId = workorder.building.site;
    buildingInfo.buildingId = workorder.building.id;

    if (workorder.space) {
      buildingInfo.spaceId = workorder.space.id;
      buildingInfo.spaceName = workorder.space.name;
    }
    if (workorder.floor) {
      buildingInfo.floorId = workorder.floor.id;
    } else {
      dispatch(getFloorId(buildingInfo.buildingId, studioId));
    }
    dispatch({ type: SET_SPACE_INFO, payload: buildingInfo });

    dispatch(getWorkorderFiles(workorderId, studioId));
    dispatch({ type: GET_WORK_ORDER, payload: workorder });
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

// Get Work order tech for auth
export const getWorkOrderTech = (workorderId, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder/${workorderId}?fields=assigned_technician.email,collaborators.collaborator.email,collaborators.collaborator.token`
    );
    dispatch({ type: GET_WORK_ORDER_TECH, payload: res.data.data });
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

// Get all files attached to work order
export const getWorkorderFiles = (workorderId, studioId) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder_directus_files?filter[workorder]=${workorderId}&fields=id,directus_files.id,directus_files.type,directus_files.title,directus_files.uploaded_on,directus_files.width,directus_files.filename_download,directus_files.technician,directus_files.height,directus_files.data.*`
    );
    dispatch({ type: GET_WORKORDER_FILES, payload: res.data.data });
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

// Patch work order status Change
export const workOrderStatusChange = (workorderId, status, studioId) => async (
  dispatch
) => {
  try {
    const res = await axios.patch(
      `/${studioId}/api/items/workorder/${workorderId}`,
      { status }
    );
    dispatch({ type: CHANGE_WORKORDER_STATUS, payload: res.data.data.status });
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

// Post new collaborator to workorder
export const addCollaborator = (workorderId, techId, studioId) => async (
  dispatch
) => {
  try {
    const res = await axios.post(
      `/${studioId}/api/items/workorder_collaborator`,
      {
        workorder: { id: workorderId },
        collaborator: { id: techId },
      }
    );
    const data = res.data.data;
    let payload = {
      id: data.id,
      collaborator: {
        id: data.collaborator,
      },
    };

    dispatch({ type: ADD_COLLABORATOR, payload });
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

// Remove Collaborator
export const removeCollaborator = (collaboratorId, studioId) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/${studioId}/api/items/workorder_collaborator/${collaboratorId}`
    );
    dispatch({ type: REMOVE_COLLABORATOR, payload: collaboratorId });
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

// GET directus_file data for new record
export const getFileInfo = (studioId, fileWorkorderId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/workorder_directus_files/${fileWorkorderId}?fields=id,directus_files.*`
    );
    dispatch({ type: ADD_WORKORDER_FILE, payload: res.data.data });
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

// Post new workorder_directus_files record with new directus_files record
export const patchWorkorderWithFile = (id, studioId, workorderId) => async (
  dispatch
) => {
  try {
    const res = await axios.post(
      `/${studioId}/api/items/workorder_directus_files?filter[workorder]=${workorderId}`,
      {
        workorder: workorderId,
        directus_files: id,
      }
    );
    dispatch(getFileInfo(studioId, res.data.data.id));
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
// Delete workorder_directus_files record
export const deleteAttachment = (id, studioId) => async (dispatch) => {
  try {
    await axios.delete(`/${studioId}/api/items/workorder_directus_files/${id}`);
    dispatch({ type: DELETE_ATTACHMENT, payload: id });
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
// Upload file Attachment
export const uploadFile = (data, studioId, workorderId, techId) => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('technician', techId);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.post(`/${studioId}/api/files`, formData, config);
    dispatch(patchWorkorderWithFile(res.data.data.id, studioId, workorderId));
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

// Patch Workorder with new comment to requestor
export const sendCommentToRequestor = (
  comment,
  studioId,
  workorderId
) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `/${studioId}/api/items/workorder/${workorderId}?fields=*,*`,
      {
        administrator_comment: comment,
      }
    );
    dispatch({
      type: SEND_COMMENT_TO_REQUESTOR,
      payload: res.data.data.administrator_comment,
    });
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
// Clear Current Workorder and components
export const clearCurrent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
  dispatch({ type: CLEAR_COMPONENT_STATE });
};

// set loading to true
export const setLoading = () => (dispatch) => {
  dispatch({ type: SET_LOADING });
};
