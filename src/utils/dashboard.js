function reshapeArray(array, shape) {
  const reshaped = [];

  for (let n = 0; n < shape[0]; n++) {
    reshaped.push(array.slice(n * shape[1], (n + 1) * shape[1]));
  }

  return reshaped;
}

function createBoxes(shape, grid, adjacents, mined) {
  const boxes = {};

  for (let r = 0; r < shape[0]; r++) {
    for (let c = 0; c < shape[1]; c++) {
      const id = grid[r][c];

      boxes[id] = {
        adjacents: adjacents[r][c],
        adjacentMinesCount: 0,
        id,
        marked: false,
        mined: mined[r][c],
        visible: false,
      };
    }
  }

  Object.keys(boxes).forEach((id) => {
    boxes[id].adjacentMinesCount = boxes[id].adjacents.reduce((
      count,
      adjacentId,
    ) => count + Number(boxes[adjacentId].mined), 0);
  });

  return boxes;
}

function getAdjacents(shape, grid) {
  const adj = grid.map(row => row.map(() => []));
  const clast = shape[1] - 1;
  const rlast = shape[0] - 1;

  for (let r = 0; r < rlast; r++) {
    for (let c = 0; c < clast; c++) {
      adj[r][c].push(grid[r][c + 1], ...grid[r + 1].slice(c, c + 2));
      adj[r][c + 1].push(grid[r][c], grid[r + 1][c]);
      adj[r + 1][c].push(...grid[r].slice(c, c + 2));
      adj[r + 1][c + 1].push(grid[r][c]);
    }
    adj[r][clast].push(grid[r + 1][clast]);
    adj[r + 1][clast].push(grid[r][clast]);
  }
  for (let c = 0; c < clast; c++) {
    adj[rlast][c].push(grid[rlast][c + 1]);
    adj[rlast][c + 1].push(grid[rlast][c]);
  }

  return adj;
}

function getMined(random, random2d, grid, mines) {
  random.sort((a, b) => b - a); // descending order

  const bottomLim = random[mines];

  return grid.map((row, r) => row.map((_, c) => random2d[r][c] > bottomLim));
}

export default (length, rows, mines) => {
  const boxIds = [];
  const random = [];
  const shape = [rows, length / rows];

  for (let n = 0; n < length; n++) {
    boxIds.push(n);
    random.push(Math.random());
  }

  const grid = reshapeArray(boxIds, shape);
  const random2d = reshapeArray(random, shape);

  const adjacents = getAdjacents(shape, grid);
  const mined = getMined(random, random2d, grid, mines);
  const boxes = createBoxes(shape, grid, adjacents, mined);

  return { boxes, grid, length, shape };
};
