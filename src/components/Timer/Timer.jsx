import { useEffect, useState } from "react";
import "./Timer.css";

function Timer({ isGameOver, isResetTimer }) {
  const [time, setTime] = useState(0);

  const timeRepresentation = (timeFraction) => {
    return timeFraction < 10 ? `0${timeFraction}` : `${timeFraction}`;
  };

  useEffect(() => {
    if (isGameOver) return;

    const timeInterval = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  });

  return (
    <>
      <p className="visually-hidden">Timer</p>
      {timeRepresentation(Math.floor((time / 60).toFixed(0)))}:{timeRepresentation(time % 60)}
    </>
  );
}

export default Timer;
