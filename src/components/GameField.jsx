import React from "react";
import Square from "./Square";
import classNames from "classnames";

const GameField = ({ squares, onSquareClick, isActive, winningSquares, winningLineType }) => {
  const isWinningSquare = (index) =>
      Array.isArray(winningSquares) && winningSquares.includes(index);

  const squareClasses = [
    "right-border bottom-border",
    "right-border bottom-border",
    "bottom-border",
    "right-border bottom-border",
    "right-border bottom-border",
    "bottom-border",
    "right-border",
    "right-border",
    "",
  ];

  return (
      <div className="square-field">
        {squares.map((square, index) => (
            <Square
                key={index}
                onClick={() => isActive && onSquareClick(index)}
                value={square}
                className={classNames("square", squareClasses[index], {
                  "winning-square": isWinningSquare(index),
                })}
            />
        ))}
        {!!winningSquares.length && winningLineType && (
            <div className={classNames("strike", `winning-line-${winningLineType}`)}></div>
        )}
      </div>
  );
};

export default GameField;
