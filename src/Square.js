import React from "react";

function Square(props) {
  let name = "square";
  name += props.isResultSquare ? " end-square" : "";
  name += props.value ? " selected" : "";
  return (
    <button className={name} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
