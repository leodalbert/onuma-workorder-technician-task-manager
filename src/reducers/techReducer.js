import { CURRENT_TECH, GET_TECHS } from '../actions/types';

const initialState = {
  techs: [],
  current: null,
  siteGroup: undefined,
  email: '',
  name: '',
  id: undefined,
  studio: undefined,
  token: undefined,
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
        token: payload.token,
        siteGroup: Number(payload.site_group.id),
        id: Number(payload.id),
      };
    default:
      return state;
  }
}
