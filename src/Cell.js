import React from 'react';

export default function Cell({ isAlive, coords, toggleAlive }) {
  const classes = 'cell ' + (isAlive ? 'is-alive' : '');
  return (
    <div className={classes} onClick={() => toggleAlive(coords)}>
    </div>
  );
}