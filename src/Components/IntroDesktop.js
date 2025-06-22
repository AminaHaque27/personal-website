import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroDesktop.css";

const IntroDesktop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        navigate("/main"); // Navigates when Enter is pressed
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div
      className="intro-desktop"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/Port.gif"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="intro-text">
        <p>
          <span className="typing">Booting system...</span>
        </p>
        <p>Welcome to Amina Haque’s Digital World</p>
        <p className="enter-text">Press ENTER to log in</p>

        {/* ✅ New Button for Mobile */}
        <button className="enter-button" onClick={() => navigate("/main")}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default IntroDesktop;
