import React from "react"

interface HeaderProps {
    resetGame: () => void;
    score: { player1: number; player2: number };
}
const Header: React.FC<HeaderProps> = ({resetGame, score}) => {
  
    return (
        <header>
            <h3>Player 1</h3>
                <div className="score">
                    <p>Score: {score.player1} : {score.player2}</p>
                    <button className='reset' onClick={resetGame}>Reset</button>
                </div>

            <h3>Player 2</h3>
        </header>
        );

    };

export default Header;