import React from 'react';
import styles from './styles.module.css';

export default props => (
  <div className={styles.container} onClick={props.onNewGame}>
    New game
  </div>
);
