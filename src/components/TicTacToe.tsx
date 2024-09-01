import React, { useEffect, useState } from "react";
import Player from "./Player";
import Header from "./Header";
import ChatField from "./ChatField";
import { getWinLineTypeAndPosition } from "./utils";
import circle_icon from "../assets/o.png";
import cross_icon from "../assets/x.png";

const PLAYER_X = cross_icon;
const PLAYER_O = circle_icon;

const winningCombinations: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
interface Score {
  player1: number;
  player2: number;
}

const TicTacToe: React.FC = () => {
  const [player1Squares, setPlayer1Squares] = useState<(string | null)[]>(Array(9).fill(null));
  const [player2Squares, setPlayer2Squares] = useState<(string | null)[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<string>(PLAYER_X);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [initialMove, setInitialMove] = useState<boolean>(true);
  const [winner, setWinner] = useState<(string | null)>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [winningLineType, setWinningLineType] = useState<string>("");
  const [score, setScore] = useState<Score>({ player1: 0, player2: 0 });
  const [gameStatus, setGameStatus] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [player1Message, setPlayer1Message] = useState<string>("");
  const [player2Message, setPlayer2Message] = useState<string>("");
  const [resetFlag, setResetFlag] = useState<boolean>(false);

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

  const updateScore = (winner:string) => {
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

  const handleSquareClick = (index:number) => {
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
      const { type } = getWinLineTypeAndPosition(
        winnerInfo.winningSquares
      );
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

  const checkWinner = (squares: (string | null)[]):{winner: string; winningSquares: number[] } | null => {
    for (let [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a]!, winningSquares: [a, b, c] };
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
