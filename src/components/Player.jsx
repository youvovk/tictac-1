import React from "react";
import GameField from "./GameField";
import { getWinner } from "./utils";
import classNames from "classnames";

const Player = ({ squares, onSquareClick, isActive, playerText, winningSquares, winningLineType }) => {

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
