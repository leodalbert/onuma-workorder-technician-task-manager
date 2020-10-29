import { CURRENT_TECH, GET_TECHS } from '../actions/types';

const initialState = {
  techs: [],
  current: null,
  email: '',
  name: '',
  id: undefined,
  studio: undefined,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TECHS:
      return {
        ...state,
        techs: payload,
      };
    case CURRENT_TECH:
      return {
        ...state,
        current: payload,
        email: payload.email,
        name: payload.first_name + ' ' + payload.last_name,
        studio: payload.studioId,
        id: Number(payload.id),
      };
    default:
      return state;
  }
}
