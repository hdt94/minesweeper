// Not exported functions

const getAdjacents = (dashboard) => {
  const { cols, grid, rows } = dashboard;
  const adj = grid.map(row => row.map(() => []));
  const clast = cols - 1;
  const rlast = rows - 1;

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
};


// Exported functions

export const createBoxes = (dashboard) => {
  const adj = getAdjacents(dashboard);
  const boxes = {};
  const { cols, grid, rows } = dashboard;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = grid[r][c];

      boxes[id] = {
        adjacents: adj[r][c],
        id,
        state: 'blank',
      };
    }
  }

  return boxes;
};

export const createBoxIds = (length) => {
  const arr = [];

  for (let n = 0; n < length; n++) {
    arr.push(n);
  }

  return arr;
};

export const createDashboard = (boxIds, rows) => {
  const cols = boxIds.length / rows;
  const dashboard = {
    cols,
    grid: [],
    rows,
  };

  for (let n = 0; n < rows; n++) {
    dashboard.grid.push(boxIds.slice(n * cols, (n + 1) * cols));
  }

  return dashboard;
};
