import React from 'react';

import styles from './styles.module.css';
import Box from './Box';

const Dashboard = (props) => {
  const { dashboard, onBoxClick, toggleBoxFlag } = props;

  return (
    <div className={styles.container}>
      {dashboard && dashboard.grid.map((row, index) => (
        <div className={styles.row} key={index}>
          {row.map(id => (
            <Box
              key={id}
              boxId={id}
              onClick={onBoxClick}
              toggleBoxFlag={toggleBoxFlag}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

Dashboard.defaultProps = {
  dashboard: null,
};

export default Dashboard;
