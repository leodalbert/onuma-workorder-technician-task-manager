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
} from '../actions/types';

const initialState = {
  workOrders: [],
  current: {
    id: '',
    tasks: [],
    collaborators: [],
    building: { name: '' },
    space: { name: '' },
    status: 'Assigned',
  },
  currentSpaceInfo: {
    siteId: '',
    buildingId: '',
    floorId: 0,
    spaceId: '',
    spaceName: '',
  },
  // spaceId: undefined,
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
        current: payload,
        loading: false,
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
    case UPDATE_WORKORDER_TASK:
      return {
        ...state,
        current: {
          ...state.current,
          tasks: state.current.tasks.map((task) => {
            console.log(task);
            if (task.id === payload.id) {
              console.log('this one: ', task);
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
