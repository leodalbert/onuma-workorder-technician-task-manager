import {
  GET_SPACE_COMPONENTS,
  CLEAR_COMPONENT_STATE,
  GET_WORK_ORDER_COMPONENTS,
  FILL_DIALOG_COMPONENT,
  CLEAR_DIALOG_COMPONENT,
  REMOVE_COMPONENT,
} from '../actions/types';

const initialState = {
  components: [],
  current: null,
  workOrderComponents: [],
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
    pace_number: '',
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
        description: instance_description,
        barcode,
        serial_number,
        installation_date,
        warranty_start_date,
        attributes: instance_attributes,
        space: [
          {
            space: {
              name: space_name,
              number: space_number,
              floor: { name: floor_name, number: floor_number },
            },
          },
        ],
        component_type: {
          category,
          name: type_name,
          description: type_description,
          labour_warranty_duration,
          labour_warranty_guarantor,
          parts_warranty_guarantor,
          parts_warranty_duration,
          warranty_duration_unit,
          manufacturer,
          model_number,
          attributes: type_attributes,
        },
      } = payload;
      return {
        ...state,
        dialogComponent: {
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
          instance_attributes,
          type_attributes,
        },
      };
    case CLEAR_DIALOG_COMPONENT:
      return {
        ...state,
        dialogComponent: initialState.dialogComponent,
      };
    default:
      return state;
  }
}
