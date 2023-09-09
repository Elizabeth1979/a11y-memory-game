import { useEffect } from "react";

function Liveregion({ message, setMessage, role = "status" }) {
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  }, [message]);

  return (
    <div role={role} className="liveregion visually-hidden">
      {message}
    </div>
  );
}

export default Liveregion;
