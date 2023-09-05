import { useRef, useState } from "react";
import "./Form.css";
import { addUser } from "../../firebase/database";


function isValidEmail(text) {
  return text !== "" && text.includes("@");
}

function isValidNickname(text) {
  return text !== "";
}

function createUniqueName(email) {
  const name = email.split("@")[0];
  const noSpecialCharsName = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  return noSpecialCharsName;
}

function Form({ onStart, isFirstTime }) {
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const nicknameValue = nicknameRef.current.value;
    const validEmail = isValidEmail(emailValue);
    const validNickname = isValidNickname(nicknameValue);
    if (validEmail && validNickname) {
      const name = createUniqueName(emailValue);
      const newUser = await addUser(name, nicknameValue);
      onStart(newUser);
    } else if (!validNickname && !validEmail) {
      setNicknameErrorMessage("Please fill in your nickname");
      setEmailErrorMessage("Please fill in a proper email address");
      nicknameRef.current.focus();
    } else {
      if (!validNickname) {
        console.log("hey");
        setNicknameErrorMessage("Please fill in your nickname");
        setEmailErrorMessage("");
        nicknameRef.current.focus();
      }

      if (!validEmail) {
        setEmailErrorMessage("Please fill in a proper email address");
        setNicknameErrorMessage("");
        emailRef.current.focus();
      }
    }
  };

  return (
    <section className="form-section">
      <div id="form-description" className="explanation">
        <p>
          In this short memory game, you are expected to match questions with answers as fast as you
          can.
        </p>
        <p className="keyboard">Use your keyboard only!</p>
        <p>
          Goodluck <span aria-hidden="true">&#128640;</span>
        </p>
      </div>

      <form
        role="form"
        aria-labelledby="form-title"
        aria-describedby="form-description"
        className="form-container"
        noValidate="novalidate"
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <h2 id="form-title">Enter your details</h2>
        <div className="input-container">
          <label htmlFor="nickname">
            Nickname <span className="small-font">{`(required)`}</span>
          </label>
          <input
            id="nickname"
            ref={nicknameRef}
            type="text"
            aria-describedby="nickname-error"
            autoFocus={!isFirstTime}
          />
          {!!nicknameErrorMessage && (
            <p id="nickname-error" className="small-font">
              {nicknameErrorMessage}
            </p>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="email">
            Email <span className="small-font">{`(required)`}</span>
          </label>
          <input id="email" ref={emailRef} type="email" aria-describedby="email-error" />
          {!!emailErrorMessage && (
            <p id="email-error" className="small-font">
              {emailErrorMessage}
            </p>
          )}
        </div>
        <button className="form-btn">Start Game!</button>
      </form>
    </section>
  );
}

export default Form;
