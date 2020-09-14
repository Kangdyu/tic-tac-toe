import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        isResultSquare={this.props.endSquares?.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = Array(9)
      .fill(null)
      .map((_, index) => this.renderSquare(index));

    return <div className="board-grid">{squares}</div>;
  }
}

export default Board;
