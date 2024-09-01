import React, { useEffect, useState } from "react";
import Player from "./Player";
import Header from "./Header";
import ChatField from "./ChatField";
import { getWinLineTypeAndPosition } from "./utils";
import circle_icon from "../assets/o.png";
import cross_icon from "../assets/x.png";

const PLAYER_X = cross_icon;
const PLAYER_O = circle_icon;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [player1Squares, setPlayer1Squares] = useState(Array(9).fill(null));
  const [player2Squares, setPlayer2Squares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [gameStarted, setGameStarted] = useState(false);
  const [initialMove, setInitialMove] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [winningLineType, setWinningLineType] = useState("");
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameStatus, setGameStatus] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [player1Message, setPlayer1Message] = useState("");
  const [player2Message, setPlayer2Message] = useState("");
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (winner || gameStatus) {
      setShowResult(true);
      const timer = setTimeout(() => {
        startNewGame();
        setShowResult(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [winner, gameStatus]);

  const startNewGame = () => {
    setPlayer1Squares(Array(9).fill(null));
    setPlayer2Squares(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setGameStarted(true);
    setInitialMove(true);
    setWinner(null);
    setWinningSquares([]);
    setWinningLineType("");
    setGameStatus("");
  };

  const resetAllData = () => {
    setScore({ player1: 0, player2: 0 });
    setPlayer1Message("");
    setPlayer2Message("");
    setShowResult(false);
    setResetFlag((prevFlag) => !prevFlag);
    startNewGame();
  };

  const updateScore = (winner) => {
    setScore((prevScore) => ({
      ...prevScore,
      ...(winner === PLAYER_X ? { player1: prevScore.player1 + 1 } : {}),
      ...(winner === PLAYER_O ? { player2: prevScore.player2 + 1 } : {}),
    }));
  };

  const getPlayerXText = winner
      ? winner === PLAYER_X
          ? "You win!"
          : "You lost!"
      : initialMove
          ? "Game started! Your turn:"
          : playerTurn === PLAYER_X
              ? "Your turn:"
              : "Wait your opponent.";

  const getPlayerOText = winner
      ? winner === PLAYER_O
          ? "You win!"
          : "You lost!"
      : initialMove
          ? "Game started! Wait your opponent."
          : playerTurn === PLAYER_O
              ? "Your turn:"
              : "Wait your opponent.";

  const handleSquareClick = (index) => {
    if (winner || gameStatus) return;

    const currentPlayerSquares =
        playerTurn === PLAYER_X ? player1Squares : player2Squares;
    const PlayerSquares =
        playerTurn === PLAYER_X ? setPlayer1Squares : setPlayer2Squares;

    if (currentPlayerSquares[index] !== null) return;

    const newSquares1 = [...player1Squares];
    const newSquares2 = [...player2Squares];

    newSquares1[index] = playerTurn;
    newSquares2[index] = playerTurn;

    setPlayer1Squares(newSquares1);
    setPlayer2Squares(newSquares2);

    const winnerInfo = checkWinner(newSquares1);
    if (winnerInfo) {
      const { type } = getWinLineTypeAndPosition(winnerInfo.winningSquares);
      setWinner(playerTurn);
      setWinningSquares(winnerInfo.winningSquares);
      setWinningLineType(type);
      updateScore(playerTurn);
    } else {
      const isBoardFull = newSquares1.every((square) => square !== null);
      if (isBoardFull) {
        setGameStatus("Draw!");
      } else {
        setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
        setInitialMove(false);
      }
    }
  };

  const checkWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
    }
    return null;
  };

  return (
      <>
        <Header resetGame={resetAllData} score={score} />
        <hr />
        <div className="gameField-container">
          <div className="gameField">
            <div className="player">
              <Player
                  squares={player1Squares}
                  onSquareClick={handleSquareClick}
                  isActive={
                      gameStarted && playerTurn === PLAYER_X && !winner && !gameStatus
                  }
                  playerText={
                    winner
                        ? winner === PLAYER_X
                            ? "You win!"
                            : "You lost!"
                        : gameStatus === "Draw!"
                            ? "Draw!"
                            : getPlayerXText
                  }
                  winner={winner}
                  winningSquares={winningSquares}
                  winningLineType={winningLineType}
                  playerMessage={player1Message}
                  setPlayerMessage={setPlayer1Message}
              />
              {showResult && (
                  <div className="result-overlay">
                    <div className="result-message">
                      {winner
                          ? `${score.player1} : ${score.player2}`
                          : `${score.player1} : ${score.player2}`}
                    </div>
                  </div>
              )}
            </div>
            <div className="vertical-divider"></div>

            <div className="player">
              <Player
                  squares={player2Squares}
                  onSquareClick={handleSquareClick}
                  isActive={
                      gameStarted && playerTurn === PLAYER_O && !winner && !gameStatus
                  }
                  playerText={
                    winner
                        ? winner === PLAYER_O
                            ? "You win!"
                            : "You lost!"
                        : gameStatus === "Draw!"
                            ? "Draw!"
                            : getPlayerOText
                  }
                  winner={winner}
                  winningSquares={winningSquares}
                  winningLineType={winningLineType}
                  playerMessage={player2Message}
                  setPlayerMessage={setPlayer2Message}
              />
              {showResult && (
                  <div className="result-overlay">
                    <div className="result-message">
                      {winner
                          ? `${score.player1} : ${score.player2}`
                          : `${score.player1} : ${score.player2}`}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
        <ChatField resetFlag={resetFlag} />
      </>
  );
}

export default TicTacToe;
