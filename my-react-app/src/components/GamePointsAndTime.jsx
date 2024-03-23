import React, { useState, useEffect } from 'react';

export default function GamePointsAndTime({ guesses, pointsAndTime, onTimeEnd }) {
  const [timeLeft, setTimeLeft] = useState(pointsAndTime.time);

  useEffect(() => {
    // exit early when we reach 0 or when guesses.length === 5
    if (!timeLeft || guesses.length === 5) {
      onTimeEnd(timeLeft);
      setTimeLeft(60);
      return;
    }

    // only start the timer if there are guesses
    if (guesses && guesses.length > 0) {
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, guesses]);

  return <div className="timer">{timeLeft}</div>;
}