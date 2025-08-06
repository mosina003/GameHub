import React from 'react';
import { useNavigate } from 'react-router-dom';

const games = [
  { name: "Tetris", path: "/game/tetris" },
  { name: "Sudoku", path: "/game/sudoku" },
  { name: "Tic Tac Toe", path: "/game/tictactoe-mode" },
  { name: "Snake", path: "/game/snake" },
  { name: "Catch Items", path: "/game/catchItems" },
];

const styles = {
  container: {
    position: "relative",
    padding: "20px",
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#030101ff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guest';

  // ✅ Inline background style using image from public folder
  const backgroundStyle = {
    backgroundImage: "url('/images/Pink-Gaming.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    position: 'relative', // For logout button positioning
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };
  

  return (
    <div style={backgroundStyle}>
      <div className="home-container">
        <h2>Welcome, {username}!</h2>
        <p>Select a game to play:</p>
        <div className="games-grid">
          {games.map((game, index) => (
            <div key={index} className="game-card" onClick={() => navigate(game.path)}>
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
        🔒 Logout
      </button>
      </div>
    </div>
  );
 
};

export default HomePage;
