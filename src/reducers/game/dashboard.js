import * as actionTypes from '../../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return { ...action.payload.dashboard };
    default:
      return state;
  }
};
