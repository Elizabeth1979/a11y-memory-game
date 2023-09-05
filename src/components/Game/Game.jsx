import "./Game.css";
import { useEffect, useRef, useState } from "react";
import { prepareData } from "./game-utils";
import Card from "../Card/Card";
import Timer from "../Timer/Timer";
import { updateScore } from "../../firebase/database";

// side effect (event, useEffect)

function Game({ data, user, setGameOn, setIsFirstTime }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isResetTimer, setIsResetTimer] = useState(false);
  const [isFirstGame, setIsFirstGame] = useState(true);
  const cardsRef = useRef(null);
  const gameRef = useRef(null);

  const timerId1 = useRef(null);
  const timerId2 = useRef(null);
  const timerId3 = useRef(null);

  const isGameOver = cards.length === 0 ? false : cards.every((card) => card.match === true);

  const prepareNewGame = () => {
    clearTimeout(timerId1.current)
    clearTimeout(timerId2.current)
    clearTimeout(timerId3.current)
    const shuffledCards = prepareData(data);
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setDisabled(false);
    setIsResetTimer(true);
    timerId1.current = setTimeout(() => {
      setIsResetTimer(false);
    }, 100);
    timerId2.current = setTimeout(() => {
      isFirstGame ? gameRef.current.focus() : cardsRef.current.focus();
      setIsFirstGame(false);
    }, 1000);
  };

  const goToRegistrationForm = () => {
    setGameOn(false);
    setIsFirstTime(false);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    prepareNewGame();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.corresponding === choiceTwo.corresponding) {
        setCards(
          cards.map((card) => {
            return card.corresponding === choiceOne.corresponding
              ? { ...card, match: true }
              : { ...card };
          })
        );
        resetTurn();
      } else {
        timerId3.current = setTimeout(() => {
          resetTurn();
          cardsRef.current.focus();
        }, 4000);
      }
    }
    // return () => {
    //   clearTimeout(timeout)
    // }
  }, [choiceOne, choiceTwo]);

  console.log("isGameOver", isGameOver);

  useEffect(() => {
    if (!isGameOver) return;

    updateScore(user, 0, turns)
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("error");
      }); // TBD!!!
  }, [isGameOver]);

  return (
    <section ref={gameRef} aria-label="game" tabIndex="-1" className="game-section">
      <div className="game-header">
        <div>
          {isGameOver ? (
            <p>
              Game over! <span aria-hidden="true">&#127942;</span>
            </p>
          ) : (
            <p>
              Game on! <span aria-hidden="true">&#9203;</span>
            </p>
          )}
        </div>
        <Timer isGameOver={isGameOver} isResetTimer={isResetTimer} />
        <p className="turns">Turns: {turns}</p>
      </div>
      <ul role="list" aria-label="cards" ref={cardsRef} tabIndex="-1" className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.match}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </ul>
      <div className="game-footer">
        <button className="game-btn" onClick={prepareNewGame}>
          New Game
        </button>
        <button className="register-btn" onClick={goToRegistrationForm}>
          Register
        </button>
      </div>
    </section>
  );
}

export default Game;
