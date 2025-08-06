import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SnakeGame.css";
import HomeButton from '../../components/HomeButton'; // ✅ Reusable button

const SnakeGame = () => {
  const boardSize = 20;
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("snakeHighScore")) || 0
  );
  const intervalRef = useRef(null);

  const getRandomCoord = () =>
    [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];

  const moveSnake = () => {
    const head = [...snake[0]];
    switch (direction) {
      case "UP": head[1] -= 1; break;
      case "DOWN": head[1] += 1; break;
      case "LEFT": head[0] -= 1; break;
      case "RIGHT": head[0] += 1; break;
    }

    const newSnake = [head, ...snake];

    if (head[0] === food[0] && head[1] === food[1]) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snakeHighScore", newScore);
      }
      setFood(getRandomCoord());
    } else {
      newSnake.pop();
    }

    if (
      head[0] < 0 ||
      head[0] >= boardSize ||
      head[1] < 0 ||
      head[1] >= boardSize ||
      snake.some(([x, y]) => x === head[0] && y === head[1])
    ) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      return;
    }

    setSnake(newSnake);
  };

 const handleKey = (e) => {
  // Prevent key interference if focused on a button/input/etc.
  const tag = e.target.tagName.toLowerCase();
  if (tag === "button" || tag === "input" || tag === "textarea") return;

  const dir = e.key.replace("Arrow", "");
  if (
    ["Up", "Down", "Left", "Right"].includes(dir) &&
    !(
      (direction === "UP" && dir === "Down") ||
      (direction === "DOWN" && dir === "Up") ||
      (direction === "LEFT" && dir === "Right") ||
      (direction === "RIGHT" && dir === "Left")
    )
  ) {
    setDirection(dir.toUpperCase());
  }
};


  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    intervalRef.current = setInterval(moveSnake, 200);
    return () => {
      document.removeEventListener("keydown", handleKey);
      clearInterval(intervalRef.current);
    };
  });

  const restartGame = () => {
    setSnake([[10, 10]]);
    setFood(getRandomCoord());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    intervalRef.current = setInterval(moveSnake, 200);
  };

  return (
    <div
    style={{
      backgroundImage: `url("/images/snake.jpg")`,
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
    <HomeButton />
    <div className="snake-container">
      <h1>🐍 Snake Game</h1>
      <div className="snake-score">Score: {score}</div>
      <div className="snake-board">
        {[...Array(boardSize * boardSize)].map((_, i) => {
          const x = i % boardSize;
          const y = Math.floor(i / boardSize);
          const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
          const isFood = food[0] === x && food[1] === y;

          return (
            <div
              key={i}
              className={`snake-cell ${isSnake ? "snake-body" : ""} ${isFood ? "snake-food" : ""}`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="snake-gameover-overlay">
          <div className="snake-gameover-text">💀 Game Over</div>
          <p>🎯 Score: {score}</p>
          <p>🏆 High Score: {highScore}</p>
          <button onClick={restartGame}>🔁 Restart</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default SnakeGame;
