import { useEffect } from 'react';

export default function GameEnd({
  guesses,
  resetGuesses,
  result,
  correctAnswer,
  handleGameEnd,
}) {
  // Check if there is a subarray where all objects have the property background: 'lightgreen'
  const allGreen = guesses.some(
    (subArray) =>
      subArray.length > 0 &&
      subArray.every((item) => item.background === 'lightgreen')
  );

  useEffect(() => {
    if (allGreen) {
      handleGameEnd();
    }
  }, [allGreen, handleGameEnd]);

  if (allGreen) {
    return (
      <div className="gameEnd">
        <h1>Congratulations!</h1>
        <h2>Correct Answer: {correctAnswer}</h2>
        <h3>Score: {result.points}</h3>
        <h2>Post to leaderboard</h2>
        <h3>Or</h3>
        <button onClick={resetGuesses} className="gameOverButton">
          Try again
        </button>
      </div>
    );
  } else {
  }
  if (guesses.length === 5) {
    return (
      <div className="gameEnd">
        <h1>Game Over</h1>
        <h2>Correct Answer: {correctAnswer}</h2>
        <button onClick={resetGuesses} className="gameOverButton">
          Try again?
        </button>
      </div>
    );
  }
}
