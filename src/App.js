import React from 'react';
import './App.css';

import Cell from './Cell';

function App() {
  const board = [...Array(40).keys()].map((_, i) => <Cell key={i} isAlive={i % 2 === 0}/>);
  return (
    <div id="app">
      {board}
    </div>
  );
}

export default App;
