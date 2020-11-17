import {
  SET_SPACE_INFO_STATUS,
  GET_WORKORDER_STATUS_INFO,
  SET_STUDIO,
  GET_ALL_SPACES,
  SET_STATUS_PAGE_LOADING,
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
    case SET_STATUS_PAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
