import React, { useState, useEffect } from 'react';
import './App.css';
import Cell from './Cell';

function range(size) {
  return [...Array(size).keys()];
}

function randomBool() {
  return Math.random() >= 0.5;
}

function createBoard(size, blank=false) {
  return range(size).map(() => range(size).map(() => blank ? false : randomBool()));
}

function copyBoard(board) {
  return board.map(row => row.map(cell => cell));
}

function livingNeighborCount(row, col, board) {
  const neighborIndexes = 
    [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
     [row,     col - 1],                 [row,     col + 1],
     [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]];

  return neighborIndexes
    .filter(([r, c]) => r >= 0 && r < board.length && c >= 0 && c < board.length)
    .reduce((count, [r, c]) => count + (board[r][c] ? 1 : 0), 0);
}

function nextBoard(oldBoard) {
  const newBoard = copyBoard(oldBoard);
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      const isAlive = oldBoard[row][col];
      const count = livingNeighborCount(row, col, oldBoard);
      if (isAlive && (count < 2 || count > 3)) {
        newBoard[row][col] = false;
      } else if (!isAlive && count === 3) {
        newBoard[row][col] = true;
      }
    }
  }

  return newBoard;
}

function App() {
  const initialBoardSize = 50;

  const [board, setBoard] = useState(createBoard(initialBoardSize));
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const boardSize = () => board.length;

  const toggleAlive = ([row, col]) => {
    const newBoard = copyBoard(board);
    newBoard[row][col] = !newBoard[row][col];
    setBoard(newBoard);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setBoard(nextBoard)
      }, 100);
      setIntervalId(intervalId);
    } else {
      intervalId && clearInterval(intervalId);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const clear = () => setBoard(createBoard(boardSize(), true));
  const random = () => setBoard(createBoard(boardSize()));
  const resetBoard = evt => setBoard(createBoard(parseInt(evt.target.value)));

  const gridColStyle = { gridTemplateColumns: 'auto '.repeat(boardSize()) };
  const sizeOptions = range(10).map(n => (n+1) * 10);
  return (
    <>
      <header id="header">
        {isRunning
          ? <button className="primary" onClick={stop}>Stop</button>
          : <>
              <button className="primary" onClick={start}>Start</button>
              <button onClick={random}>Random</button>
              <button onClick={clear}>Clear</button>
              <select onChange={resetBoard} value={boardSize()}>
                {sizeOptions.map(size => <option key={size}>{size}</option>)}
              </select>
            </> 
        }
      </header>
      <div id="board" style={gridColStyle}>
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
    </>
  );
}

export default App;
