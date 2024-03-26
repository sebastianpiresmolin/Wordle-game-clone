import React, { useState, useEffect } from 'react';

export default function GamePointsAndTime({
  guesses,
  pointsAndTime,
  onTimeEnd,
}) {
  const allGreen = guesses.some(
    (subArray) =>
      subArray.length > 0 &&
      subArray.every((item) => item.background === 'lightgreen')
  );
  const [timeLeft, setTimeLeft] = useState(pointsAndTime.time);

  useEffect(() => {
    // exit early when we reach 0, when guesses.length === 5, or when allGreen is true
    if (!timeLeft || guesses.length === 5 || allGreen ) {
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
  }, [timeLeft, guesses, allGreen]);

  if (guesses && guesses.length > 0 && guesses.length < 5 && !allGreen) {
    return <div className="timer">{timeLeft}</div>;
  }
}