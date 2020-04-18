import React from 'react';

export default React.memo(function Cell({ isAlive, row, col, toggleAlive }) {
  const classes = 'cell ' + (isAlive ? 'is-alive' : '');
  return (
    <div className={classes} onClick={() => toggleAlive(row, col)}>
    </div>
  );
});