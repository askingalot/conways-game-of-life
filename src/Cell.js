import React from 'react';

export default function Cell({ isAlive, coords }) {
  const classes = 'cell ' + (isAlive ? 'is-alive' : '');
  const [row, col] = coords;
  return (
    <div className={classes}>
     ({row}, {col})
    </div>
  );
}