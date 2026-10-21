import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [show]);

  return (
    <div className="clock">
      {show && <span>{time.toLocaleTimeString()}</span>}
      <button onClick={() => setShow(!show)}>
        {show ? "Ẩn" : "Hiện"}
      </button>
    </div>
  );
}
