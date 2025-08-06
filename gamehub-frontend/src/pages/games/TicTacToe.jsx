import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TicTacToe.css";
import HomeButton from '../../components/HomeButton'; // ✅ Reusable button

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const gameMode = location.state?.mode || "2P";

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const updated = [...board];
    updated[index] = isXTurn ? "X" : "O";

    setBoard(updated);
    checkWinner(updated);

    if (gameMode === "AI" && isXTurn) {
      setTimeout(() => {
        makeAIMove(updated);
      }, 500);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const makeAIMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((v, i) => (v === null ? i : null))
      .filter((i) => i !== null);

    if (emptyIndices.length === 0 || winner) return;

    const aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...currentBoard];
    newBoard[aiMove] = "O";

    setBoard(newBoard);
    checkWinner(newBoard);
    setIsXTurn(true);
  };

  const checkWinner = (board) => {
    for (let [a, b, c] of winningLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url("/images/tit.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* ✅ Home Button placed globally at the top */}
      <HomeButton />

      <div className="tictactoe-container">
        <h1>Tic Tac Toe</h1>
        <div className="status">
          {winner
            ? winner === "Draw"
              ? "🤝 It's a Draw!"
              : `🎉 Winner: ${winner}`
            : `Turn: ${isXTurn ? "X" : "O"}`}
        </div>

        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="reset-btn" onClick={resetGame}>🔁 Restart</button>
          <button className="reset-btn" onClick={() => navigate("/game/tictactoe-mode")}>↩️ Back</button>
          {/* Removed duplicate home button */}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
