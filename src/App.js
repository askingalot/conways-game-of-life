import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Cell from './Cell';

function range(size) {
  return [...Array(size).keys()];
}

function randomBool() {
  return Math.random() >= 0.5;
}

function createBoard(size, blank=false) {
  return blank
    ? range(size).map(() => Array(size).fill(false))
    : range(size).map(() => range(size).map(randomBool));
}

function copyBoard(board) {
  return board.map(row => row.slice());
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

function perflivingNeighborCount(row, col, board) {
  let aliveCount = 0
  for (let r = row - 1; r <= row + 1; r++) {
    if (r < 0 || r >= board.length) continue;

    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0 || c >= board.length || (r === row && c === col)) continue;

      if (board[r][c]) {
        aliveCount++
      }
    }
  }

  return aliveCount;
}

function nextBoard(oldBoard) {
  const newBoard = createBoard(oldBoard.length, true);

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      const isAlive = oldBoard[row][col];
      const count = perflivingNeighborCount(row, col, oldBoard);
      if (isAlive && (count < 2 || count > 3)) {
        newBoard[row][col] = false;
      } else if (!isAlive && count === 3) {
        newBoard[row][col] = true;
      } else {
        newBoard[row][col] = isAlive;
      }
    }
  }

  return newBoard;
}

function App() {
  const initialBoardSize = 50;

  const [board, setBoard] = useState(() => createBoard(initialBoardSize));
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const boardSize = () => board.length;

  const toggleAlive = (row, col) => {
    const newBoard = copyBoard(board);
    newBoard[row][col] = !newBoard[row][col];
    setBoard(newBoard);
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setBoard(nextBoard)
      }, 200);
      setIntervalId(intervalId);
    } else {
      intervalId && clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => intervalId && clearInterval(intervalId);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const clear = () => setBoard(createBoard(boardSize(), true));
  const random = () => setBoard(createBoard(boardSize()));
  const resetBoard = evt => setBoard(createBoard(parseInt(evt.target.value)));

  const gridColStyle = { gridTemplateColumns: 'auto '.repeat(boardSize()) };
  const sizeOptions = [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];
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
                row={ri}
                col={ci}
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
