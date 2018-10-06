import React from 'react';
import { connect } from 'react-redux';

import * as gameActions from '../../actions/game';

import styles from './styles.module.css';
import Controls from './Controls';
import Dashboard from './Dashboard';
import Status from './Status';

class Game extends React.Component {
  componentDidMount() {
    if (this.props.game.status.length === 0) {
      this.createNewGame();
    }
  }

  componentDidUpdate() {
    const { game } = this.props;
    const { dashboard, hidden } = game;

    if (game.status !== 'active') {
      return;
    }

    if (dashboard.mines === hidden) {
      this.props.winGame();
    }
  }

  createNewGame = () => {
    this.props.createGame(20, 5, 8);
  }

  handleBoxClick = (boxId) => {
    const { boxes } = this.props;

    if (boxes[boxId].flagged) {
      return;
    }

    if (boxes[boxId].mined) {
      this.props.showBoxes([boxId]);
      this.props.loseGame();
      return;
    }

    this.props.showBoxes(this.recursiveBoxIds([], boxId));
  };

  toggleBoxFlag = (boxId) => {
    const box = this.props.boxes[boxId];

    if (box.flagged) {
      this.props.unflagBox(boxId);
      return;
    }

    this.props.flagBox(boxId);
  }

  recursiveBoxIds(array, seed) {
    const { boxes } = this.props;

    array.push(seed);

    return boxes[seed].adjacents.reduce((reduction, id) => (
      (
        boxes[id].mined
        || boxes[id].visible
        || reduction.includes(id)
      ) ? reduction : this.recursiveBoxIds(reduction, id)
    ), array);
  }

  render() {
    const { dashboard, status } = this.props.game;
    const active = status === 'active';
    const onBoxClick = active ? this.handleBoxClick : undefined;
    const toggleBoxFlag = active ? this.toggleBoxFlag : undefined;

    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <Controls onNewGame={this.createNewGame}/>
          <Status status={status} />
        </div>
        <div className={styles.dashboard}>
          <Dashboard
            dashboard={dashboard}
            onBoxClick={onBoxClick}
            toggleBoxFlag={toggleBoxFlag}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  boxes: state.game.dashboard && state.game.dashboard.boxes,
  game: state.game,
});
const mapDispatch = ({
  createGame: gameActions.create,
  flagBox: gameActions.flagBox,
  loseGame: gameActions.loseGame,
  showBoxes: gameActions.showBoxes,
  unflagBox: gameActions.unflagBox,
  winGame: gameActions.winGame,
});

export default connect(mapState, mapDispatch)(Game);
