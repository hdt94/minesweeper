import * as actionTypes from '../../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return action.payload.hidden;
    case actionTypes.SHOW_BOXES:
      return state - action.payload.boxIds.length;
    default:
      return state;
  }
};
