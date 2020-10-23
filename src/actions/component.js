import axios from 'axios';

import {
  GET_SPACE_COMPONENTS,
  GET_WORK_ORDER_COMPONENTS,
  ERROR,
  FILL_DIALOG_COMPONENT,
  CLEAR_DIALOG_COMPONENT,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  SET_COMPONENT_LOADING,
  SEARCH_COMPONENTS,
  SEARCH_LOADING,
  CLEAR_SEARCH_STATE,
} from './types';

// Get all components by space id
export const getSpaceComponents = (spaceId, studioId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/space/${spaceId}?fields=components.component.name,components.component.id,components.component.instance_name`
    );

    dispatch({ type: GET_SPACE_COMPONENTS, payload: res.data.data.components });
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

// Get details for work order components by component id and append instanceId
export const getWorkOrderComponentDetails = (
  componentId,
  instanceId,
  studioId
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/${studioId}/api/items/component/${componentId}?fields=id,component_type.model_number,component_type.description,component_type.name,component_type.manufacturer,component_type.parts_warranty_guarantor,component_type.parts_warranty_duration,component_type.labour_warranty_guarantor,component_type.labour_warranty_duration,component_type.warranty_duration_unit,component_type.category,name,instance_name,description,serial_number,barcode,installation_date,warranty_start_date,space.space.name,space.id,space.space.floor.name,space.space.floor.number,space.space.number,component_type.attributes,attributes,`
    );
    let data = res.data.data;
    data.instanceId = instanceId;
    dispatch({ type: SET_COMPONENT_LOADING, payload: false });
    dispatch({ type: GET_WORK_ORDER_COMPONENTS, payload: data });
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

// Post component to work order
export const addComponent = (componentId, workorderId, studioId) => async (
  dispatch
) => {
  dispatch({ type: SET_COMPONENT_LOADING, payload: true });
  try {
    const res = await axios.post(`/${studioId}/api/items/component_workorder`, {
      component: componentId,
      workorder: workorderId,
    });

    // object with component instance and type id
    const componentIds = {
      id: res.data.data.id,
      component: res.data.data.component,
    };

    // get details and add button on component page
    dispatch(
      getWorkOrderComponentDetails(
        componentIds.component,
        componentIds.id,
        studioId
      )
    );

    // add component to workorder state
    dispatch({
      type: ADD_COMPONENT,
      payload: componentIds,
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

// Delete component from work order
export const removeComponent = (componentWorkorderId, studioId) => async (
  dispatch
) => {
  dispatch({ type: REMOVE_COMPONENT, payload: componentWorkorderId });
  try {
    await axios.delete(
      `/${studioId}/api/items/component_workorder/${componentWorkorderId}`
    );
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

// Get all components in bulding by search criteria
export const searchComponents = (searchParam, buildingId, studioId) => async (
  dispatch
) => {
  dispatch({ type: SEARCH_LOADING });
  try {
    const res = await axios.get(
      `/${studioId}/api/items/space_component?fields=id,component.name,component.id, component.barcode, component.component_type.manufacturer,component.instance_name, component.component_type.name,component.component_type.model_number,component.serial_number, component.space.space.name,component.space.space.number,component.space.space.floor.name, component.space.space.floor.number&filter[space.floor.building.id][eq]=${buildingId}&filter[component.name][contains]=${searchParam}&filter[component.component_type][contains]=${searchParam}&filter[component.component_type][logical]=or&filter[component.barcode][contains]=${searchParam}&filter[component.barcode][logical]=or&filter[component.serial_number][contains]=${searchParam}&filter[component.serial_number][logical]=or&filter[component.instance_name][contains]=${searchParam}&filter[component.instance_name][logical]=or`
    );
    dispatch({ type: SEARCH_COMPONENTS, payload: res.data.data });
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

// Populate Component dialog with payload
export const fillComponentDialog = (component) => (dispatch) => {
  dispatch({ type: FILL_DIALOG_COMPONENT, payload: component });
};

// Clear Component dialog state
export const clearComponentDialog = () => (dispatch) => {
  dispatch({ type: CLEAR_DIALOG_COMPONENT });
};
// Clear Component dialog state
export const clearSearchState = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_STATE });
};
