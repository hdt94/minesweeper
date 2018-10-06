import React from 'react';
import styles from './styles.module.css';

const messages = {
  active: '',
  over: 'You clicked a mine! Game is over :( Start a new game!',
  won: 'You passed over all mines! :) Start a new game!',
};

export default ({ status }) => (
  <div className={status in styles ? styles[status] : ''}>
    {status in messages ? messages[status] : 'Game status'}
  </div>
);
