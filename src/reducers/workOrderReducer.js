import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  ERROR,
  SET_LOADING,
  CLEAR_CURRENT,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  ADD_TASK,
  CHANGE_WORKORDER_STATUS,
  SET_SPACE_INFO,
  UPDATE_WORKORDER_TASK,
  ADD_COLLABORATOR,
  REMOVE_COLLABORATOR,
  GET_WORKORDER_FILES,
  ADD_WORKORDER_FILE,
  SEND_COMMENT_TO_REQUESTOR,
  DELETE_ATTACHMENT,
  GET_WORK_ORDER_TECH,
} from '../actions/types';

const initialState = {
  workOrders: [],
  current: {
    id: undefined,
    tasks: [],
    collaborators: [],
    building: { name: '' },
    space: { name: '' },
    status: 'Assigned',
    assigned_technician: {
      id: undefined,
      email: '',
    },
    maintenance_procedure_name: '',
    preventive_maintenance_description: '',
    maintenance_procedures: [],
    token: '',
    request_email_cc: '',
  },
  currentFiles: [],
  currentSpaceInfo: {
    siteId: undefined,
    buildingId: undefined,
    floorId: 0,
    spaceId: undefined,
    spaceName: '',
  },
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TECHS_WORK_ORDERS:
      return {
        ...state,
        workOrders: payload,
        loading: false,
      };
    case GET_WORK_ORDER:
      return {
        ...state,
        current: {
          ...payload,
          maintenance_procedures: payload.maintenance_procedures || [],
        },
        loading: false,
      };
    case GET_WORK_ORDER_TECH:
      return {
        ...state,
        current: {
          ...state.current,
          assigned_technician: {
            id: undefined,
            email: payload.assigned_technician.email,
          },
          collaborators: payload.collaborators,
        },
      };
    case SEND_COMMENT_TO_REQUESTOR:
      return {
        ...state,
        current: {
          ...state.current,
          administrator_comment: payload,
        },
      };
    case GET_WORKORDER_FILES:
      return {
        ...state,
        currentFiles: payload,
      };
    case ADD_WORKORDER_FILE:
      return {
        ...state,
        currentFiles: [...state.currentFiles, payload],
      };
    case DELETE_ATTACHMENT:
      return {
        ...state,
        currentFiles: state.currentFiles.filter((file) => file.id !== payload),
      };
    case SET_SPACE_INFO:
      return {
        ...state,
        currentSpaceInfo: {
          ...state.currentSpaceInfo,
          ...payload,
        },
      };
    case ADD_COMPONENT:
      return {
        ...state,
        current: {
          ...state.current,
          components: [...state.current.components, payload],
        },
      };
    case ADD_COLLABORATOR:
      return {
        ...state,
        current: {
          ...state.current,
          collaborators: [...state.current.collaborators, payload],
        },
      };
    case REMOVE_COLLABORATOR:
      return {
        ...state,
        current: {
          ...state.current,
          collaborators: state.current.collaborators.filter(
            (colaborator) => colaborator.id !== payload
          ),
        },
      };
    case UPDATE_WORKORDER_TASK:
      return {
        ...state,
        current: {
          ...state.current,
          tasks: state.current.tasks.map((task) => {
            if (task.id === payload.id) {
              return payload;
            } else {
              return task;
            }
          }),
        },
      };
    case REMOVE_COMPONENT:
      return {
        ...state,
        current: {
          ...state.current,
          components: state.current.components.filter(
            (component) => component.id !== payload
          ),
        },
      };
    case ADD_TASK:
      return {
        ...state,
        current: { ...state.current, tasks: [...state.current.tasks, payload] },
      };
    case CHANGE_WORKORDER_STATUS:
      return {
        ...state,
        current: { ...state.current, status: payload },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: initialState.current,
        currentSpaceInfo: initialState.currentSpaceInfo,
        currentFiles: initialState.currentFiles,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
