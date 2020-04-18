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
  return range(size).map(() => range(size).map(() => randomBool()));
}

function copyBoard(board) {
  return board.map(row => row.map(cell => cell));
}

function App() {
  const boardSize = 20;
  const [board, setBoard] = useState(initialBoard(boardSize));

  const toggleAlive = ([row, col]) => {
    const newBoard = copyBoard(board);
    newBoard[row][col] = !newBoard[row][col];
    setBoard(newBoard);
  }

  const gridColStyle = { gridTemplateColumns: 'auto '.repeat(boardSize) };
  return (
    <div id="app" style={gridColStyle}>
      {
        board.map((row, ri) => 
          row.map((isAlive, ci) => 
            <Cell key={ri * 10000 + ci}
              isAlive={isAlive}
              coords={[ri, ci]}
              toggleAlive={toggleAlive}
            />
          )
        )
      }
    </div>
  );
}

export default App;
