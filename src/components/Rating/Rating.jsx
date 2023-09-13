import "./Rating.css";
import { getUsers } from "../../firebase/database";
import { useEffect, useState, useRef } from "react";

function Rating() {
  const [users, setUsers] = useState([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ratingContainerRef = useRef(null);

  useEffect(() => {
    getUsers().then((data) => {
      if (data === null) return;
      setUsers(Object.values(data));
    });
  }, []);

  useEffect(() => {
    const ratingContainer = ratingContainerRef.current;
    if (ratingContainer) {
      setIsOverflowing(ratingContainer.scrollHeight > ratingContainer.clientHeight);
    }
  }, [users]);

  const filteredUsers = users.filter((user) => {
    return user.turns !== 0;
  });

  return (
    <aside>
      <h2 className="rating-title">
        Scores <span aria-hidden="true">&#127942;</span>
      </h2>
      <div className="list-container">
        {!!filteredUsers.length && (
          <ol
            ref={ratingContainerRef}
            aria-label="participants"
            {...(isOverflowing && {tabIndex: 0})}
            className="participants"
          >
            {filteredUsers
              .sort((user1, user2) => {
                return user1.bestTimeSeconds - user2.bestTimeSeconds;
              })
              .map((user) => {
                return (
                  <li className="participant" key={user.name}>
                      <p className="nickname">{user.nickname}</p>
                      <div className="scoring">
                        <p>
                          <span className="visually-hidden">time</span>
                          {user.bestTimeStr}
                          <span aria-hidden="true">{` |`}</span>
                        </p>
                        <p>{`${user.turns} turns`}</p>
                      </div>
                  </li>
                );
              })}
          </ol>
        )}
      </div>
    </aside>
  );
}

export default Rating;
