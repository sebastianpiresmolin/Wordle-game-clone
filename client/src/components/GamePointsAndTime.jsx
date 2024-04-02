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
    // exit early when guesses.length === 5, or when allGreen is true
    if (guesses.length === 5 || allGreen) {
      onTimeEnd(timeLeft);
      setTimeLeft(0);
      return;
    }

    // only start the timer if there are guesses
    if (guesses && guesses.length > 0) {
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft + 1);
      }, 1000);

      // clear interval on re-render
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, guesses, allGreen]);
  //behold the conditional of doom
  //if guesses is not empty and has less than 5 guesses and not allGreen
  //return the timer
  if (guesses && guesses.length > 0 && guesses.length < 5 && !allGreen) {
    return <div className="timer"><h2>Time: {timeLeft}</h2></div>;
  }
}
