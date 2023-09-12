import { useEffect, useRef } from "react";
import "./Dialog.css";
import { createPortal } from "react-dom";
import { calculateTime } from "../Game/game-utils";

function Dialog({ user, time, isGameOver, goToRegistrationForm }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current.showModal();
  };

  useEffect(() => {
    if (isGameOver) showModal();
  }, [isGameOver]);

  console.log(user);

  return createPortal(
    <dialog ref={dialogRef}>
      <div className="dialog-container">
        <h2 className="dialog-title">
          Game over! <span aria-hidden="true">&#127942;</span>
        </h2>
        <p className="result">
          Congrats {user.nickname}, you finished the game at {calculateTime(time)}
        </p>
        <button className="new-game-btn" onClick={goToRegistrationForm}>
          New Game
        </button>
      </div>
    </dialog>,
    document.body
  );
}

export default Dialog;
