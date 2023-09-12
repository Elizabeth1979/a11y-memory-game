import { useEffect, useRef } from "react";
import "./Dialog.css";
import { createPortal } from "react-dom";

function Dialog({ isGameOver, goToRegistrationForm }) {
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  };

  useEffect(() => {
    if (isGameOver) showModal();
  }, [isGameOver]);

  return createPortal(
    <dialog ref={dialogRef}>
      <div className="dialog-container">
        <h2 className="dialog-title">
          Game over! <span aria-hidden="true">&#127942;</span>
        </h2>
        <p className="result">
          You finished the game at 02:10 which ranks you at place 10 out of 100
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
