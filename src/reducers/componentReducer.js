import {
  GET_SPACE_COMPONENTS,
  CLEAR_COMPONENT_STATE,
  GET_WORK_ORDER_COMPONENTS,
  FILL_DIALOG_COMPONENT,
  CLEAR_DIALOG_COMPONENT,
  REMOVE_COMPONENT,
  SET_COMPONENT_LOADING,
} from '../actions/types';

const initialState = {
  components: [],
  current: null,
  workOrderComponents: [],
  componentLoading: false,
  dialogComponent: {
    id: null,
    name: '',
    instance_name: '',
    instance_description: '',
    barcode: '',
    serial_number: '',
    installation_date: '',
    warranty_start_date: '',
    space_name: '',
    space_number: '',
    floor_name: '',
    floor_number: null,
    category: '',
    type_name: '',
    type_description: '',
    labour_warranty_duration: '',
    labour_warranty_guarantor: '',
    parts_warranty_guarantor: '',
    parts_warranty_duration: '',
    warranty_duration_unit: '',
    manufacturer: '',
    model_number: '',
    type_attributes: {},
    instance_attributes: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SPACE_COMPONENTS:
      return {
        ...state,
        components: payload,
      };
    case GET_WORK_ORDER_COMPONENTS:
      return {
        ...state,
        workOrderComponents: [...state.workOrderComponents, payload],
      };
    case CLEAR_COMPONENT_STATE:
      return {
        ...state,
        components: [],
        current: null,
        workOrderComponents: [],
        dialogComponent: initialState.dialogComponent,
      };
    case REMOVE_COMPONENT:
      return {
        ...state,
        workOrderComponents: state.workOrderComponents.filter(
          (component) => component.instanceId !== payload
        ),
      };
    case FILL_DIALOG_COMPONENT:
      const {
        id,
        name,
        instance_name,
        instance_description,
        barcode,
        serial_number,
        installation_date,
        warranty_start_date,
        space_name,
        space_number,
        floor_name,
        floor_number,
        category,
        type_name,
        type_description,
        labour_warranty_duration,
        labour_warranty_guarantor,
        parts_warranty_guarantor,
        parts_warranty_duration,
        warranty_duration_unit,
        manufacturer,
        model_number,
        type_attributes,
        instance_attributes,
      } = initialState.dialogComponent;
      let data = payload;
      if (!data.component_type) {
        data.component_type = {};
      }
      if (!data.space[0]) {
        data.space[0] = {};
      }
      if (!data.space[0].floor) {
        data.space[0].floor = {};
      }
      return {
        ...state,
        dialogComponent: {
          id: data.id || id,
          name: data.name || name,
          instance_name: data.instance_name || instance_name,
          instance_description: data.description || instance_description,
          barcode: data.barcode || barcode,
          serial_number: data.serial_number || serial_number,
          installation_date: data.installation_date || installation_date,
          warranty_start_date: data.warranty_start_date || warranty_start_date,
          space_name: data.space[0].space.name || space_name,
          space_number: data.space[0].space.number || space_number,
          floor_name: data.space[0].space.floor.name || floor_name,
          floor_number: data.space[0].space.floor.number || floor_number,
          category: data.component_type.category || category,
          type_name: data.component_type.name || type_name,
          type_description: data.component_type.description || type_description,
          labour_warranty_duration:
            data.component_type.labour_warranty_duration ||
            labour_warranty_duration,
          labour_warranty_guarantor:
            data.component_type.labour_warranty_guarantor ||
            labour_warranty_guarantor,
          parts_warranty_guarantor:
            data.component_type.parts_warranty_guarantor ||
            parts_warranty_guarantor,
          parts_warranty_duration:
            data.component_type.parts_warranty_duration ||
            parts_warranty_duration,
          warranty_duration_unit:
            data.component_type.warranty_duration_unit ||
            warranty_duration_unit,
          manufacturer: data.component_type.manufacturer || manufacturer,
          model_number: data.component_type.model_number || model_number,
          instance_attributes: data.attributes || instance_attributes,
          type_attributes: data.component_type.attributes || type_attributes,
        },
      };
    case SET_COMPONENT_LOADING: {
      return {
        ...state,
        componentLoading: payload,
      };
    }
    case CLEAR_DIALOG_COMPONENT:
      return {
        ...state,
        dialogComponent: initialState.dialogComponent,
      };
    default:
      return state;
  }
}
