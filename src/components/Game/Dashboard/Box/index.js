import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.css';

function getBoxProperties(box) {
  if (box.mined && box.visible) {
    return {
      className: styles.mined,
      children: <i className="fas fa-bomb" />,
    };
  }

  if (box.visible) {
    const { adjacentMinesCount: mines } = box;

    return {
      className: styles.visible,
      children: (mines > 0) && mines,
    };
  }

  if (box.flagged) {
    return {
      className: styles.flagged,
      children: <i className="fas fa-flag" />,
    };
  }

  return { className: styles.hidden };
}

class Box extends React.Component {
  handleClick = () => this.props.onClick(this.props.boxId);

  handleContextMenu = event => event.preventDefault();

  handleMouseDown = (event) => {
    if (event.button === 2) {
      this.props.toggleBoxFlag(this.props.boxId);
    }
  }

  render() {
    const { box, onClick, toggleBoxFlag } = this.props;

    return (
      <div
        onClick={onClick ? this.handleClick : undefined}
        onContextMenu={this.handleContextMenu}
        onMouseDown={(!box.visible && toggleBoxFlag
          ) ? this.handleMouseDown : undefined
        }
        {...getBoxProperties(box)}
      />
    );
  }
}

const mapState = (state, ownProps) => ({
  box: state.game.dashboard.boxes[ownProps.boxId],
});

export default connect(mapState)(Box);
