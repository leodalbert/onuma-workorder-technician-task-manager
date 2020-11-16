import {
  SET_SPACE_INFO_STATUS,
  GET_WORKORDER_STATUS_INFO,
  SET_STUDIO,
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
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
}
