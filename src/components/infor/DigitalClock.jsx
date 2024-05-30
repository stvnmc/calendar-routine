import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <div className="digital-clock">
      <div className="linea-digital"></div>
      <div className="linea-digital-top"></div>
      <div className="linea-digital-left"></div>
      <div className="linea-digital-right"></div>
      
      <h1>{time.toLocaleTimeString([], options)}</h1>
    </div>
  );
}

export default DigitalClock;
