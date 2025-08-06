import React, { useEffect, useState, useRef } from "react";
import "./tetris.css";
import HomeButton from '../../components/HomeButton';
import { useNavigate } from "react-router-dom";


const ROWS = 20;
const COLS = 12;
const EMPTY_CELL = 0;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const getRandomShape = () => {
  const shapes = Object.values(SHAPES);
  const index = Math.floor(Math.random() * shapes.length);
  return shapes[index];
};

const createEmptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY_CELL));

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [shape, setShape] = useState(getRandomShape());
  const [position, setPosition] = useState({ row: 0, col: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    parseInt(localStorage.getItem("tetrisHighScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isPaused && !gameOver) {
      intervalRef.current = setInterval(() => {
        moveDown();
      }, 500);
    }

    return () => clearInterval(intervalRef.current);
  }, [shape, position, isPaused, gameOver]);

  const checkCollision = (shape, row, col) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (
          shape[r][c] &&
          (board[row + r] === undefined ||
            board[row + r][col + c] === undefined ||
            board[row + r][col + c])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const mergeShape = () => {
    const newBoard = [...board.map((row) => [...row])];
    shape.forEach((r, i) =>
      r.forEach((val, j) => {
        if (val) newBoard[position.row + i][position.col + j] = 1;
      })
    );
    return newBoard;
  };

  const clearLines = (mergedBoard) => {
    const filtered = mergedBoard.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = ROWS - filtered.length;
    if (linesCleared > 0) {
      const emptyRows = Array.from({ length: linesCleared }, () =>
        Array(COLS).fill(EMPTY_CELL)
      );
      setScore((prev) => prev + linesCleared * 100);
      return [...emptyRows, ...filtered];
    }
    return mergedBoard;
  };

  const moveDown = () => {
    const newRow = position.row + 1;
    if (!checkCollision(shape, newRow, position.col)) {
      setPosition({ ...position, row: newRow });
    } else {
      const newBoard = mergeShape();
      const clearedBoard = clearLines(newBoard);
      setBoard(clearedBoard);

      const newShape = getRandomShape();
      const startingCol = Math.floor((COLS - newShape[0].length) / 2);

      if (checkCollision(newShape, 0, startingCol)) {
        setGameOver(true);
        clearInterval(intervalRef.current);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem("tetrisHighScore", score);
        }
      } else {
        setShape(newShape);
        setPosition({ row: 0, col: startingCol });
      }
    }
  };

  const move = (dir) => {
    const newCol = position.col + dir;
    if (!checkCollision(shape, position.row, newCol)) {
      setPosition({ ...position, col: newCol });
    }
  };

  const rotate = () => {
    const rotated = shape[0].map((_, i) => shape.map((row) => row[i])).reverse();
    if (!checkCollision(rotated, position.row, position.col)) {
      setShape(rotated);
    }
  };

  const handleKeyDown = (e) => {
    if (gameOver || isPaused) return;
    if (e.key === "ArrowLeft") move(-1);
    else if (e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowDown") moveDown();
    else if (e.key === "ArrowUp") rotate();
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setShape(getRandomShape());
    setPosition({ row: 0, col: 5 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const renderCell = (r, c) => {
    const filled =
      board[r][c] ||
      (r >= position.row &&
        r < position.row + shape.length &&
        c >= position.col &&
        c < position.col + shape[0].length &&
        shape[r - position.row]?.[c - position.col]);
    const className = filled
      ? board[r][c]
        ? "tetris-cell tetris-filled"
        : "tetris-cell tetris-active"
      : "tetris-cell";
    return <div key={`${r}-${c}`} className={className}></div>;
  };

  return (
    <div
      style={{
       backgroundImage: `url("/images/tetris.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      <div style={{ position: "relative", minHeight: "100vh" }}>
      <HomeButton />
      <div className="tetris-container">
        <div className="tetris-header">
          <div className="tetris-score-text">Score: {score}</div>
          <div className="tetris-pause-button">
            <button onClick={handlePauseResume}>
              {isPaused ? "Resume" : "Pause"}
            </button>
           

           
          </div>
        </div>

        <div className="tetris-grid-container">
          <div className="tetris-grid">
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => renderCell(r, c))
            )}
          </div>
          {gameOver && (
            <div className="tetris-overlay">
              <div className="tetris-overlay-text">Game Over</div>
              <p>🎯 Score: {score}</p>
              <p>🏆 High Score: {highScore}</p>
              <button onClick={handleRestart}>Restart</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>

  );
};

export default Tetris;
