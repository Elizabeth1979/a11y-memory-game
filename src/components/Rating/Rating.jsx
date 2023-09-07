import "./Rating.css";
import { getUsers } from "../../firebase/database";
import { useEffect, useState } from "react";

function Rating() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      if (data === null) return;
      setUsers(Object.values(data));
    });
  }, []);

  console.log(users);

  return (
    <aside>
      <h2 className="rating-title">
        Top scores <span aria-hidden="true">&#127942;</span>
      </h2>
      {users.length && (
        <ol aria-label="participants" tabIndex={0} className="participants">
          {users
            .filter((user) => {
              return user.turns !== 0;
            })
            .sort((user1, user2) => {
              return user1.turns - user2.turns;
            })
            .map((user) => {
              return (
                <li className="participant" key={crypto.randomUUID()}>
                  <div>
                    <p className="nickname">{user.nickname}</p>
                    <div className="scoring">
                      <p>
                        <span className="visually-hidden">time</span>05:00
                        <span aria-hidden="true">{` |`}</span>
                      </p>
                      <p>{`${user.turns} turns`}</p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ol>
      )}
    </aside>
  );
}

export default Rating;
