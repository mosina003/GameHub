import React, { useState, useEffect, useRef } from "react";
import "./CatchItemsGame.css";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from '../../components/HomeButton'; // ✅ Reusable button


const fruitEmojis = ["🍎", "🍊", "🍇", "🍉", "🍒", "🥝"];
const badEmojis = ["💣", "🧱"]; // 👈 bad items
const basketEmoji = "🧺";

const CatchItemsGame = () => {
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("highScore")) || 0;
  });
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [basketLeft, setBasketLeft] = useState(250);

  const gameRef = useRef();
  const fruitIdRef = useRef(0);
  const fallSpeedRef = useRef(2);
  const dropIntervalRef = useRef(1500);
  const dropTimerRef = useRef(null);
  const moveTimerRef = useRef(null);

  const gameWidth = 600;
  const gameHeight = 500;
  const basketWidth = 100;
  const fruitSize = 40;

  // Move basket with keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setBasketLeft((prev) => Math.max(prev - 30, 0));
      } else if (e.key === "ArrowRight") {
        setBasketLeft((prev) => Math.min(prev + 30, gameWidth - basketWidth));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Move basket with mouse
  const handleMouseMove = (e) => {
    const rect = gameRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const newLeft = Math.min(Math.max(mouseX - basketWidth / 2, 0), gameWidth - basketWidth);
    setBasketLeft(newLeft);
  };

  // Drop fruits and bad items
  useEffect(() => {
    if (gameOver) return;

    dropTimerRef.current = setInterval(() => {
      const isBadItem = Math.random() < 0.35; // 35% chance to drop a bad item
      const emoji = isBadItem
        ? badEmojis[Math.floor(Math.random() * badEmojis.length)]
        : fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

      const newFruit = {
        id: fruitIdRef.current++,
        emoji,
        isBad: isBadItem,
        left: Math.random() * (gameWidth - fruitSize),
        top: 0,
      };

      setFruits((prev) => [...prev, newFruit]);

      // Increase speed and drop frequency
      fallSpeedRef.current += 0.03;
      dropIntervalRef.current = Math.max(400, dropIntervalRef.current - 20);
    }, dropIntervalRef.current);

    return () => clearInterval(dropTimerRef.current);
  }, [gameOver]);


  // Move fruits
  useEffect(() => {
    if (gameOver) return;
    
    moveTimerRef.current = setInterval(() => {
      setFruits((prevFruits) =>
        prevFruits
          .map((fruit) => ({ ...fruit, top: fruit.top + fallSpeedRef.current }))
          .filter((fruit) => {
            const isCaught =
              fruit.top + fruitSize >= gameHeight - 50 &&
              fruit.left + fruitSize > basketLeft &&
              fruit.left < basketLeft + basketWidth;

            if (isCaught) {
              if (fruit.isBad) {
                setGameOver(true);
                clearInterval(dropTimerRef.current);
                clearInterval(moveTimerRef.current);
                return false;
              }

              setScore((prev) => {
                const newScore = prev + 1;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  localStorage.setItem("highScore", newScore);
                }
                return newScore;
              });
              return false;
            }

            if (fruit.top > gameHeight) {
              if (!fruit.isBad) {
                setLives((prevLives) => {
                  const updatedLives = prevLives - 1;
                  if (updatedLives <= 0) {
                    setGameOver(true);
                    clearInterval(dropTimerRef.current);
                    clearInterval(moveTimerRef.current);
                  }
                  return updatedLives;
                });
              }
              return false;
            }

            return true;
          })
      );
    }, 30);

    return () => clearInterval(moveTimerRef.current);
  }, [basketLeft, gameOver]);

  // Gradually increase fall speed over time
useEffect(() => {
  if (gameOver) return;

  const speedInterval = setInterval(() => {
    fallSpeedRef.current += 0.05;
  }, 1000);

  return () => clearInterval(speedInterval);
}, [gameOver]);

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setFruits([]);
    setGameOver(false);
    fallSpeedRef.current = 2;
    dropIntervalRef.current = 1500;
    fruitIdRef.current = 0;
  };

  return (
    <div
    style={{
      backgroundImage: `url("/images/catch.jpg")`,
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

    <div className="wrapper">
      <div className="score">
        Score: {score} | Lives: {lives} | High Score: {highScore}
      </div>

      <div className="game-area" ref={gameRef} onMouseMove={handleMouseMove}>
        <div className="basket" style={{ left: basketLeft }}>
          {basketEmoji}
        </div>

        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className={`fruit ${fruit.isBad ? "bad" : ""}`}
            style={{ left: fruit.left, top: fruit.top }}
          >
            {fruit.emoji}
          </div>
        ))}

        {gameOver && (
          <div className="game-over-panel">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
  </div>
  );
};

export default CatchItemsGame;
