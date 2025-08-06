import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sudoku.css";
import { useNavigate } from "react-router-dom";
import HomeButton from '../../components/HomeButton';


const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [solved, setSolved] = useState(false);
  const [highlightWrong, setHighlightWrong] = useState(false);
  const navigate = useNavigate();

  const fetchSudoku = async () => {
    setLoading(true);
    setError(null);
    setShowSolution(false);
    setMessage("");
    setSolved(false);
    setHighlightWrong(false);
    try {
      const response = await axios.get("http://localhost:8080/api/sudoku");
      if (
        response.data &&
        Array.isArray(response.data.puzzle) &&
        response.data.puzzle.length > 0
      ) {
        setPuzzle(response.data.puzzle);
        setSolution(response.data.solution);
        setUserInput(JSON.parse(JSON.stringify(response.data.puzzle)));
      } else {
        setPuzzle(null);
        setSolution(null);
        setError("Invalid board data received.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load Sudoku board.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSudoku();
  }, []);

  const handleInputChange = (value, row, col) => {
  const updated = userInput.map(row => [...row]); // Deep copy
  const num = parseInt(value, 10);
  updated[row][col] = num >= 1 && num <= 9 ? num : 0;
  setUserInput(updated);
};


  const checkSolution = () => {
  let correct = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (userInput[i][j] !== solution[i][j]) {
        correct = false;
        break;
      }
    }
    if (!correct) break;
  }

  if (correct) {
    setMessage("🎉 Congratulations! You solved the puzzle!");
    setSolved(true);
    setHighlightWrong(false);
  } else {
    setMessage("❌ Some answers are incorrect. Try again!");
    setHighlightWrong(true);
  }
};


  const renderBoard = () => (
    <table className="sudoku-board">
      <tbody>
        {userInput.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
              const isPrefilled = puzzle[rowIndex][colIndex] !== 0;
              const isIncorrect =
                highlightWrong &&
                userInput[rowIndex][colIndex] !== solution[rowIndex][colIndex] &&
                puzzle[rowIndex][colIndex] === 0;

              return (
                <td
                  key={colIndex}
                  className={`${isPrefilled ? "filled" : "empty"} ${
                    isIncorrect ? "incorrect" : ""
                  }`}
                >
                  {isPrefilled ? (
                    puzzle[rowIndex][colIndex]
                  ) : (
                    <input
                      type="number"
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[1-9]*"
                      className="sudoku-input"
                      min="1"
                      max="9"
                      value={userInput[rowIndex][colIndex] || ""}
                      onChange={(e) =>
                        handleInputChange(e.target.value, rowIndex, colIndex)
                      }
                    />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
     <div
    style={{
      backgroundImage: `url("/images/colored-sudoku.jpg")`, // place image in /public/images/
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
        padding: 0,
        overflowX: 'hidden',

    }}
  >
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <HomeButton />
    <div className="sudoku-container">
      <h1>Sudoku Game</h1>

      {loading && <p>Loading Sudoku board...</p>}
      {error && <p className="error">{error}</p>}
      {message && (
        <p className={solved ? "success" : "error"}>{message}</p>
      )}

      {!loading && puzzle && renderBoard()}
      {showSolution && solution && (
  <>
    <h2>Solution</h2>
    <table className="sudoku-board solution-board">
      <tbody>
        {solution.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="solution-cell">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

      <div className="sudoku-buttons">
        {!solved && (
          <>
            <button onClick={fetchSudoku}>New Game</button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              disabled={!puzzle}
            >
              {showSolution ? "Hide Solution" : "View Solution"}
            </button>
            <button onClick={checkSolution}>Check Solution</button>
          </>
        )}

        {solved && (
          <>
            <button onClick={fetchSudoku}>🔁 New Game</button>
            <button onClick={() => navigate("/home")}>🏠 Home</button>
          </>
        )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default Sudoku;
