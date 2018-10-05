import * as actionTypes from './types';

export const create = dashboard => ({
  type: actionTypes.CREATE_GAME,
  payload: {
    dashboard,
  },
});
