import * as actionTypes from '../../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return 'active';
    case actionTypes.LOSE_GAME:
      return 'over';
    case actionTypes.WIN_GAME:
      return 'won';
    default:
      return state;
  }
};
