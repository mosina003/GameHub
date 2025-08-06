import React from "react";
import { useNavigate } from "react-router-dom";
import './TicTacToe.css'; // Ensure this is imported

const TicTacToeMode = () => {
  const navigate = useNavigate();

  const selectMode = (mode) => {
    navigate("/game/tictactoe", { state: { mode } });
  };

  return (
    <div className="mode-select-container">
      <h2>Choose Game Mode</h2>
      <div className="button-group">
        <button onClick={() => selectMode("2P")}>🧑‍🤝‍🧑 2 Players</button>
        <button onClick={() => selectMode("AI")}>🤖 vs Computer</button>
      </div>
    </div>
  );
};

export default TicTacToeMode;
