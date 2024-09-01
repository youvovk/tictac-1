import React from "react";
import GameField from "./GameField";
import { getWinner } from "./utils";
import classNames from "classnames";

interface PlayerProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
  isActive: boolean;
  playerText: string;
  winningSquares: number[];
  winningLineType: string;
  playerMessage: string;
  setPlayerMessage:(message: string) => void;
  winner: string | null;
}
const Player: React.FC<PlayerProps> = ({squares, onSquareClick, isActive, playerText, winningSquares, winningLineType }) => {

  return (
    <div className="player-container">
      <div className="player-text">
        <p className={getWinner(playerText)}> 
          {playerText}
        </p>
      </div>
      <div className={`player ${isActive ? 'active' : 'inactive'}`}>

        <GameField 
          squares={squares} 
          onSquareClick={onSquareClick}
          isActive={isActive}
          winningSquares={winningSquares}
          winningLineType={winningLineType}
        />
        {winningSquares.length > 0 && (
          <div 
            className={classNames("strike", winningLineType)}
          />
        )}
      </div>
     </div>
  );
}
export default Player;