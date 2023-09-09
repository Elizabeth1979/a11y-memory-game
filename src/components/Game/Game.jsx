import "./Game.css";
import { useEffect, useRef, useState } from "react";
import { prepareData, calculateTime } from "./game-utils";
import Card from "../Card/Card";
import { updateScore } from "../../firebase/database";
import Confetti from "../../Confetti";

function Game({ data, user, setGameOn, setMessage, setIsFirstTime }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // const [isFirstGame, setIsFirstGame] = useState(true);
  const gameRef = useRef(null);
  const [time, setTime] = useState(0);

  const isGameOver = cards.length === 0 ? false : cards.every((card) => card.match === true);

  const prepareNewGame = () => {
    const shuffledCards = prepareData(data);
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    gameRef.current.focus();
  };

  const goToRegistrationForm = () => {
    setGameOn(false);
    setIsFirstTime(false);
  };

  // Handle a choice
  const handleChoice = (card) => {
    if (choiceOne && choiceTwo) {
      setChoiceOne(card);
      setChoiceTwo(null);
    } else {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    prepareNewGame();
  }, []);

  useEffect(() => {
    if (isGameOver) setMessage("Game Over!");
  }, [isGameOver]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.corresponding === choiceTwo.corresponding) {
        setCards(
          cards.map((card) => {
            return card.corresponding === choiceOne.corresponding
              ? { ...card, match: true }
              : { ...card };
          })
        );
        setMessage("match");
        resetTurn();
      } else {
        setMessage("mismatch");
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (!isGameOver) return;

    updateScore(user, calculateTime(time), time, turns)
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("error");
      });
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const timeInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [time]);

  return (
    <>
      {isGameOver && <Confetti />}
      <section ref={gameRef} aria-label="game panel" tabIndex="-1" className="game-section">
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
          <div className="timer-container">
            <p className="visually-hidden">Timer</p>
            {calculateTime(time)}
          </div>
          <p className="turns">Turns: {turns}</p>
        </div>
        <ul role="list" aria-label="cards" className="cards-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.match}
              handleChoice={handleChoice}
            />
          ))}
        </ul>
        <div className="game-footer">
          <button className="game-btn" onClick={goToRegistrationForm}>
            New Game
          </button>
        </div>
      </section>
    </>
  );
}

export default Game;
