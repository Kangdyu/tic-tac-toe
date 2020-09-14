import React from "react";
import Square from "./Square";

function Board({ squares, endSquares, onClick }) {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        isResultSquare={endSquares?.includes(i)}
        onClick={() => onClick(i)}
      />
    );
  };

  const squareComponents = Array(9)
    .fill(null)
    .map((_, index) => renderSquare(index));

  return <div className="board-grid">{squareComponents}</div>;
}

export default Board;
