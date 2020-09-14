import React from "react";

function Square({ isResultSquare, value, onClick }) {
  let name = "square";
  name += isResultSquare ? " end-square" : "";
  name += value ? " selected" : "";
  return (
    <button className={name} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
