import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Tetris from './pages/games/Tetris';
import './App.css';
import Sudoku from "./pages/games/Sudoku";
import TicTacToe from "./pages/games/TicTacToe";
import TicTacToeMode from "./pages/games/TicTacToeMode";
import SnakeGame from "./pages/games/SnakeGame";
import CatchItemsGame from "./pages/games/CatchItemsGame";
// Import game pages when created

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/game/tetris" element={<Tetris />} />
        <Route path="/game/sudoku" element={<Sudoku />} />
        <Route path="/game/tictactoe" element={<TicTacToe />} />
        <Route path="/game/tictactoe-mode" element={<TicTacToeMode />} />
        <Route path="/game/snake" element={<SnakeGame />} />
        <Route path="/game/catchItems" element={<CatchItemsGame />} />
        {/* Add game routes here */}
      </Routes>
    </Router>
  );
}

export default App;
