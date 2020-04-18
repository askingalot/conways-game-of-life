import React from 'react';

export default function Cell({ isAlive }) {
  const classes = { "cell": true, "is-alive": isAlive };
  return <div className={classes}>Foo</div>;
}