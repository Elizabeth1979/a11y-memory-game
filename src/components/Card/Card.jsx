import { useEffect, useRef, useState } from "react";
import "./Card.css";
import parse from "html-react-parser";

function Card({ card, handleChoice, flipped, disabled }) {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }

    setTimeout(() => {
      cardRef.current.focus();
    }, 0);
  };

  return (
    <li className={`card ${flipped ? "flipped" : ""}`}>
      <div className="front">
        <button
          aria-label={`front of card ${card.cardNumber}`}
          className="card-button"
          disabled={disabled}
          onClick={handleClick}
        ></button>
      </div>
      <div
        ref={cardRef}
        role="group"
        aria-labelledby={card.id}
        tabIndex="-1"
        className={`back ${card.match ? "correct" : "wrong"}`}
      >
        <div id={card.id}>
          <p className="card-type">{card.type}</p>
          <p className="card-description">{parse(card.description)}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
