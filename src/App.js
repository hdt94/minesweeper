import React, { Component } from 'react';
import styles from './App.module.css';
import Game from './components/Game';
import Settings from './components/Settings';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header>
          <h1>Minesweeper</h1>
        </header>
        <main className={styles.content}>
          <div className={styles.settings}>
            <Settings />
          </div>
          <div className={styles.game}>
            <Game />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
