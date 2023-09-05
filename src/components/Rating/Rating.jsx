import "./Rating.css";
import { getUsers } from "../../firebase/database";
import { useEffect, useState } from "react";

function Rating() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(Object.values(data));
    });
  }, []);

  console.log(users);

  return (
    <aside>
      <h2>Rating</h2>
      <ul>
        {users.sort((user1, user2)=>{
          return user2.turns - user1.turns;
        }).map((user) => {
          return (
            <li>
              <p>User Nickname:
              {user.nickname} , 
              {user.turns}
              </p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Rating;
