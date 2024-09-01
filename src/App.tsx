import React from "react";
import "./App-styles.css"
import TicTacToe from "./components/TicTacToe"

const App: React.FC = () => {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
};

export default App;
