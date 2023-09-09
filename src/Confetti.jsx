import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";

function Confetti() {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.document.body.scrollHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.document.body.scrollHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
        window.removeEventListener('resize', detectSize);
    }
  }, [dimension]);

  return <ReactConfetti width={window.innerWidth} height={window.document.body.scrollHeight} />;
}

export default Confetti;
