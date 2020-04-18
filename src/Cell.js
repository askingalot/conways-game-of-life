import React from 'react';

export default function Cell({ isAlive }) {
  const classes = 'cell ' + (isAlive ? 'is-alive' : '');
  return <div className={classes}>Foo</div>;
}