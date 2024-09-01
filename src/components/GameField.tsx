import React from "react";
import Square from "./Square";
import classNames from "classnames";

interface GameFieldProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void; 
  isActive: boolean;
  winningSquares: number[];
  winningLineType: string;
}
const GameField:React.FC<GameFieldProps> = ({ squares, onSquareClick, isActive, winningSquares, winningLineType }) => {
  const isWinningSquare = (index:number) =>
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
          className={classNames("square", squareClasses[index],{"winning-square": isWinningSquare(index)
          })}
        />
      ))}
      {!!winningSquares.length && winningLineType && (
        <div className={classNames("strike", `winning-line-${winningLineType}`)}></div>
      )}
      </div>
  );
}
export default GameField;