import React from 'react';
import './App.css';

import Cell from './Cell';

function App() {
  const boardSize = 20;


  const board = [...Array(boardSize).keys()].map(i => <Cell key={i} isAlive={i % 2 !== 0}/>);

  return (
    <div id="app">
      {board}
    </div>
  );
}

export default App;
