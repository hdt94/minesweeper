import * as actionTypes from './types';
import createDashboard from '../utils/dashboard';

export const create = (length, rows, mines) => {
  const dashboard = createDashboard(length, rows, mines);

  return {
    type: actionTypes.CREATE_GAME,
    payload: { dashboard, flags: 0, hidden: length },
  };
};

export const flagBox = boxId => ({
  type: actionTypes.FLAG_BOX,
  payload: { boxId },
});

export const loseGame = () => ({
  type: actionTypes.LOSE_GAME,
});

export const showBoxes = boxIds => ({
  type: actionTypes.SHOW_BOXES,
  payload: { boxIds },
});

export const unflagBox = boxId => ({
  type: actionTypes.UNFLAG_BOX,
  payload: { boxId },
});

export const winGame = () => ({
  type: actionTypes.WIN_GAME,
});
