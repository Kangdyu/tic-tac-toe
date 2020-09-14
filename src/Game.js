import React, { useState } from "react";
import Board from "./Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], endLine: lines[i] };
    }
  }
  return { winner: null, endLine: null };
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      isGameEnd: false,
      winner: null,
      endLine: null,
    },
  ]);
  const [current, setCurrent] = useState(history[0]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isTurnX, setIsTurnX] = useState(true);

  const jumpTo = (move) => {
    setStepNumber(move);
    setCurrent(history[move]);
    setIsTurnX(move % 2 === 0);
  };

  const handleClick = (i) => {
    const prevMoves = history.slice(0, stepNumber + 1);
    const current = prevMoves[prevMoves.length - 1];
    const squares = current.squares.slice();

    if (current.isGameEnd || squares[i]) {
      return;
    }

    squares[i] = isTurnX ? "X" : "O";

    const { winner, endLine } = calculateWinner(squares);
    let newMove = { squares, winner, endLine };
    if (winner || prevMoves.length + 1 === 10) {
      newMove.isGameEnd = true;
    } else {
      newMove.isGameEnd = false;
    }

    setHistory(prevMoves.concat([newMove]));
    setCurrent(newMove);
    setStepNumber(prevMoves.length);
    setIsTurnX(!isTurnX);
  };

  const moves = history.map((_, move) => {
    const desc = `#${move}`;
    const name = move === stepNumber ? "game-history now" : "game-history";

    return (
      <li key={move} className={name}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (current.isGameEnd) {
    if (current.winner) {
      status = `Winner: ${current.winner}`;
    } else {
      status = "Draw!";
    }
  } else {
    status = `Next player: ${isTurnX ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="game-status">{status}</div>
        <Board
          squares={current.squares}
          endSquares={current.endLine}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <ol className="game-history-list">{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
