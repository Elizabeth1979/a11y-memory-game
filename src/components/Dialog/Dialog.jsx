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
    if (isGameOver) {
      setTimeout(()=>{
        showModal();
      }, 2000);
    }
  }, [isGameOver]);

  console.log(user);

  return createPortal(
    <dialog ref={dialogRef}>
      <div className="dialog-container">
        <h2 className="dialog-title">
          Game over! <span aria-hidden="true">&#127942;</span>
        </h2>
        <div className="result">
        <p>
          Congrats {user.nickname}, 
        </p>
        <p>your time is {calculateTime(time)}</p>
        <p>
          You are at place 11 out of 22
        </p>
        </div>
        
        <button className="new-game-btn" onClick={goToRegistrationForm}>
          New Game
        </button>
      </div>
    </dialog>,
    document.body
  );
}

export default Dialog;
