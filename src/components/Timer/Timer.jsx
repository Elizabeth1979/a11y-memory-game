import { useEffect, useState } from "react";
import "./Timer.css";

function Timer({ isGameOver, isResetTimer }) {
  // const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  const [_time, setTime] = useState(0);

  // const timeRepresentation = (timeFraction) => {
  //   return timeFraction < 10 ? `0${timeFraction}` : `${timeFraction}`;
  // };

  // const time = `${timeRepresentation(minutes)}:${timeRepresentation(seconds)}`;

  // useEffect(() => {
  //   if (isResetTimer) {
  //     setMinutes(0);
  //     setSeconds(0);
  //   }
  // }, [isResetTimer]);

  useEffect(() => {
    if(isGameOver)return;
    
    const timeInterval = setInterval(() => {
      setTime(_time + 1);
      // setSeconds((prevSeconds) => prevSeconds + 1);
      // if (seconds === 59) {
      //   setSeconds(0);
      //   setMinutes((prevMinutes) => prevMinutes + 1);
      // }
    }, 1000);

    return () => {
      console.log('cleanup');
      clearInterval(timeInterval);
    }
  });

  return (
    <>
      <p className="visually-hidden">Timer</p>
      {Math.floor((_time / 60).toFixed(0))}:{_time % 60}

      {/* {isGameOver ? (
        <div className="timer-container">
          {_time / 60}:{_time % 60}
        </div>
      ) : (
        <div className="timer-container">{time}</div>
      )} */}
    </>
  );
}

export default Timer;
