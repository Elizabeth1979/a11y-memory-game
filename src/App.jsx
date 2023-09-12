import { useState } from "react";
import "./App.css";
import data from "./data/data.json";
import Game from "./components/Game/Game";
import Form from "./components/Form/Form";
import Rating from "./components/Rating/Rating";
import { CiLight } from "react-icons/ci";
import { WiMoonAltWaxingCrescent1 } from "react-icons/wi";
import Liveregion from "./components/Liveregion/Liveregion";

function App() {
  const [isGameOn, setGameOn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [message, setMessage] = useState("");

  const themeClass = isDarkTheme ? "dark-theme" : "light-theme";

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const onStart = (newUser) => {
    setGameOn(true);
    setUser(newUser);
  };

  return (
    <div className={`app-container ${themeClass}`}>
      <header>
        <div className="header-content">
          <h1>A11y memory game</h1>
          <svg
            role="img"
            aria-labelledby="a11y"
            className="a11y-svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="a11y">Accessibility icon</title>
            <path
              d="M14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M18 10C18 10 14.4627 11.5 12 11.5C9.53727 11.5 6 10 6 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 12V13.4522M12 13.4522C12 14.0275 12.1654 14.5906 12.4765 15.0745L15 19M12 13.4522C12 14.0275 11.8346 14.5906 11.5235 15.0745L9 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <button
          aria-label="activate dark mode"
          aria-pressed={isDarkTheme ? "true" : "false"}
          className="theme-btn"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <WiMoonAltWaxingCrescent1 /> : <CiLight />}
        </button>
      </header>
      <main>
        {isGameOn ? (
          <Game
            data={data}
            user={user}
            setGameOn={setGameOn}
            setMessage={setMessage}
            setIsFirstTime={setIsFirstTime}
          />
        ) : (
          <div className="welcome-container">
            <div className="form">
              <Form onStart={onStart} isFirstTime={isFirstTime} />
            </div>
            <div className="rating">
              <Rating />
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>Created by e11i</p>
      </footer>
      <Liveregion message={message} setMessage={setMessage} />
    </div>
  );
}

export default App;
