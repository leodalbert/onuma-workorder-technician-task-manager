import {
  GET_TECHS_WORK_ORDERS,
  GET_WORK_ORDER,
  ERROR,
  SET_LOADING,
  CLEAR_CURRENT,
  ADD_COMPONENT,
  REMOVE_COMPONENT,
} from '../actions/types';

const initialState = {
  workOrders: [],
  current: {
    tasks: [],
  },
  spaceId: '',
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
        spaceId: payload.space.id,
        loading: false,
      };
    case ADD_COMPONENT:
      return {
        ...state,
        current: {
          ...state.current,
          components: [...state.current.components, payload],
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
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: initialState.current,
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
