import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/home")} style={styles.button}>
      🏠 Home
    </button>
  );
};

const styles = {
  button: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#010701ff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    zIndex: 9999,
  },
};

export default HomeButton;
