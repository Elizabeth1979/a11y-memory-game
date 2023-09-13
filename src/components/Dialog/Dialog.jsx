import { useEffect, useRef, useState } from "react";
import "./Dialog.css";
import { createPortal } from "react-dom";
import { calculateTime } from "../Game/game-utils";
import { getUsers } from "../../firebase/database";

function Dialog({ user, time, isGameOver, goToRegistrationForm }) {
  const [place, setPlace] = useState({
    place: -1,
    total: -1,
  });
  const dialogRef = useRef(null);

  const showModal = () => {
    dialogRef.current.showModal();
  };

  // const handleCancel = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  //   console.log("closing");
  // };

  useEffect(() => {
    getUsers().then((data) => {
      let filteredUsers, sortedUsers;
      if (data === null) return;
      filteredUsers = Object.values(data).filter((user) => user.turns !== 0);
      if (filteredUsers.length !== 0) {
        sortedUsers = filteredUsers.sort((user1, user2) => {
          return user1.bestTimeSeconds - user2.bestTimeSeconds;
        });
      }
      let index = sortedUsers.findIndex((u) => u.nickname === user?.nickname);
      console.log(index);
      console.log(sortedUsers);
      if (index !== -1) {
        setPlace({ ...place, place: index + 1, total: sortedUsers.length });
      }
    });
  }, []);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        showModal();
      }, 4000);
    }
  }, [isGameOver]);

  return createPortal(
    <dialog ref={dialogRef}>
        <h2 className="dialog-title">
          Game over <span aria-hidden="true">&#127942;</span>
        </h2>
        <p role="text" className="result">
          <span>Congrats {user?.nickname}!</span> <span>Your time: {calculateTime(time)}</span>
          <span>
            Your place: {place.place} out of {place.total}
          </span>
        </p>
        <button className="new-game-btn" onClick={goToRegistrationForm}>
          New Game
        </button>
    </dialog>,
    document.body
  );
}

export default Dialog;
