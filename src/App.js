import React, { useState } from 'react';
import './App.css';
import Cell from './Cell';

function range(size) {
  return [...Array(size).keys()];
}

function randomBool() {
  return Math.random() >= 0.5;
}

function initialBoard(size) {
  return range(size).map(_ => range(size).map(_ => randomBool()));
}

function App() {
  const boardSize = 20;

  const [board, setBoard] = useState(initialBoard(boardSize));

  const gridColStyle = {
    'grid-template-columns': 'auto '.repeat(boardSize)
  };

  return (
    <div id="app" style={gridColStyle}>
      {
        board.map((row, ri) => 
          row.map((isAlive, ci) => 
            <Cell key={ri * 10000 + ci}
              isAlive={isAlive}
              coords={[ri, ci]} 
            />
          )
        )
      }
    </div>
  );
}

export default App;
