import { useRef } from "react";
import "./Card.css";
import parse from "html-react-parser";

function Card({ card, handleChoice, flipped }) {
  const cardRef = useRef(null);

  const handleClick = () => {
    handleChoice(card);

    setTimeout(() => {
      cardRef.current.focus();
    }, 0);
  };

  return (
    <li className="card">
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="back">
          <button
            aria-label={`back of card ${card.cardNumber}`}
            className="card-button"
            onClick={handleClick}
          ></button>
        </div>
        <div className={`front ${card.match ? "correct" : "wrong"}`}>
          <div ref={cardRef} role="text" tabIndex="-1" id={card.id}>
            <p className="card-type">{card.type}</p>
            <p className="card-description">{parse(card.description)}</p>
          </div>
        </div>
        <span class="fire" aria-hidden="true">
          &#128293;
        </span>
        <span class="think" aria-hidden="true">
          &#129300;
        </span>
      </div>
    </li>
  );
}

export default Card;
