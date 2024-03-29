export default function GameEnd({
  guesses,
  resetGuesses,
  result,
  correctAnswer,
}) {
  // Check if there is a subarray where all objects have the property background: 'lightgreen'
  const allGreen = guesses.some(
    (subArray) =>
      subArray.length > 0 &&
      subArray.every((item) => item.background === 'lightgreen')
  );

  if (allGreen) {
    return (
      <div className="gameEnd">
        <h2>Congratulations!</h2>
        <p>Correct Answer: {correctAnswer}</p>
        <p>Score: {result.points}</p>
        <p>Post to leaderboard</p>
        <p>Or</p>
        <button onClick={resetGuesses}>Try again</button>
      </div>
    );
  } else {
  }
  if (guesses.length === 5) {
    return (
      <div className="gameEnd">
        <h2>Game Over</h2>
        <p>Correct Answer: {correctAnswer}</p>
        <button onClick={resetGuesses}>Try again?</button>
      </div>
    );
  }
}
