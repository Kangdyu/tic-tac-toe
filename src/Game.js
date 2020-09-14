import React from "react";
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      isTurnX: true,
      isGameEnd: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (current.isGameEnd || squares[i]) {
      return;
    }

    squares[i] = this.state.isTurnX ? "X" : "O";

    const { winner, line } = calculateWinner(squares);
    let history_new = { squares, winner, endLine: line };
    if (winner || history.length + 1 === 10) {
      history_new.isGameEnd = true;
    } else {
      history_new.isGameEnd = false;
    }
    this.setState({
      history: history.concat([history_new]),
      stepNumber: history.length,
      isTurnX: !this.state.isTurnX,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isTurnX: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = `#${move}`;
      const name =
        move === this.state.stepNumber ? "game-history now" : "game-history";
      return (
        <li key={move} className={name}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
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
      status = `Next player: ${this.state.isTurnX ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="game-status">{status}</div>
          <Board
            squares={current.squares}
            endSquares={current.endLine}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <ol className="game-history-list">{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
