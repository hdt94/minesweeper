import * as actionTypes from '../../actions/types';

function updateBoxes(state, boxIds, update) {
  const { boxes } = state;
  const updatedBoxes = {};

  boxIds.forEach((id) => {
    updatedBoxes[id] = { ...boxes[id], ...update };
  });

  return {
    ...state,
    boxes: { ...boxes, ...updatedBoxes },
  };
}

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return { ...action.payload.dashboard };
    case actionTypes.FLAG_BOX:
      return updateBoxes(state, [action.payload.boxId], { flagged: true });
    case actionTypes.SHOW_BOXES:
      return updateBoxes(state, action.payload.boxIds, { visible: true });
    case actionTypes.UNFLAG_BOX:
      return updateBoxes(state, [action.payload.boxId], { flagged: false });
    default:
      return state;
  }
};
