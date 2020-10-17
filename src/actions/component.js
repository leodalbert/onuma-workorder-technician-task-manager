import axios from 'axios';

import {
  GET_SPACE_COMPONENTS,
  GET_WORK_ORDER_COMPONENTS,
  ERROR,
  FILL_DIALOG_COMPONENT,
  CLEAR_DIALOG_COMPONENT,
} from './types';

// get all components by space
export const getSpaceComponents = (spaceId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/26/api/items/space/${spaceId}?fields=components.component.name,components.component.id,components.component.instance_name`
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

// get details for work order components
export const getWorkOrderComponentDetails = (componentId) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/26/api/items/component/${componentId}?fields=id, component_type.model_number, component_type.description, component_type.name, component_type.manufacturer, component_type.parts_warranty_guarantor, component_type.parts_warranty_duration, component_type.labour_warranty_guarantor, component_type.labour_warranty_duration, component_type.warranty_duration_unit,component_type.category,name,instance_name,description,serial_number,barcode,installation_date,warranty_start_date, space.space.name, space.id, space.space.floor.name, space.space.floor.number, space.space.number`
    );
    dispatch({ type: GET_WORK_ORDER_COMPONENTS, payload: res.data.data });
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