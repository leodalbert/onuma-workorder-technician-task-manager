import {
  SET_SPACE_INFO_STATUS,
  GET_WORKORDER_STATUS_INFO,
  SET_STUDIO,
  GET_ALL_SPACES,
  SET_STATUS_PAGE_LOADING,
  SET_STATUS,
  GET_REQUESTER_WORK_ORDERS,
  CLEAR_REQUESTER_CURRENT,
} from '../actions/types';

const initialState = {
  workOrders: [],
  studio: undefined,
  email: undefined,
  current: {
    id: undefined,
    status: undefined,
    assigned_technician: {
      id: undefined,
    },
    request_email: '',
  },
  currentSpaceInfo: {
    siteId: undefined,
    buildingId: undefined,
    floorId: 0,
    spaceId: undefined,
    spaceName: '',
  },
  allSpaces: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_SPACES:
      return {
        ...state,
        allSpaces: payload,
      };
    case GET_REQUESTER_WORK_ORDERS: {
      return {
        ...state,
        workOrders: payload,
        loading: false,
      };
    }
    case GET_WORKORDER_STATUS_INFO:
      return {
        ...state,
        current: payload,
        loading: false,
      };
    case SET_SPACE_INFO_STATUS:
      return {
        ...state,
        currentSpaceInfo: {
          ...state.currentSpaceInfo,
          ...payload,
        },
      };
    case SET_STUDIO:
      return {
        ...state,
        studio: payload.studio,
        email: payload.email,
      };
    case SET_STATUS:
      return {
        ...state,
        current: {
          ...state.current,
          status: payload,
        },
      };
    case SET_STATUS_PAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_REQUESTER_CURRENT:
      return {
        ...state,
        current: initialState.current,
        currentSpaceInfo: initialState.currentSpaceInfo,
        allSpaces: initialState.allSpaces,
      };
    default:
      return state;
  }
}
