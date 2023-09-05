import { getDatabase, ref, set, child, push, update, get } from "firebase/database";
import { app } from "./app";

const db = getDatabase(app);
const dbRef = ref(getDatabase());

export async function getUsers() {
  try {
    const snapshot = await get(child(dbRef, `users`));
    return snapshot.val();
  } catch (error) {
    return null;
  }
}

export async function addUser(name, nickname) {
  const path = ref(db, "users/" + name);
  const user = {
    name: name,
    nickname: nickname,
    bestTime: -1,
    turns: 0,
  };
  await set(path, user);
  return user;
}

export async function updateScore(user, bestTime, turns) {
  const db = getDatabase();
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};

  // read current data validate

  updates["/users/" + user.name] = {...user, bestTime: bestTime, turns: turns };

  return update(ref(db), updates);
}
