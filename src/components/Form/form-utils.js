export const patterns = {
  username: /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})([a-z]{2,8})?$/,
};

export const errors = {
  nickname: "Please fill in your nickname",
  email: "Please fill in a proper email as follows: elli@wix.com",
};

export function checkEmail(email) {
  return patterns.email.test(email)
}

export function checkNickname(nickname) {
  return nickname !== "";
}

export function createUniqueNameForDB(email) {
    const username = email.split("@")[0];
    const noSpecialCharsName = username.replace(patterns.username, "");
    return noSpecialCharsName;
  }
