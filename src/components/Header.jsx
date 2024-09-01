import React from "react";

const Header = ({ resetGame, score }) => {
    return (
        <header>
            <h3>Player 1</h3>
            <div className="score">
                <p>Score: {score.player1} : {score.player2}</p>
                <button className="reset" onClick={resetGame}>Reset</button>
            </div>
            <h3>Player 2</h3>
        </header>
    );
};

export default Header;
