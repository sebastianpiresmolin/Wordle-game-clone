export default function GameEnd({items}) {
    const allGreen = items.some(subArray =>
        subArray.length > 0 && subArray.every(item => item.background === 'lightgreen')
      );
      
      if (allGreen) {
        return (
          <div className="gameEnd">
            <h2>Congratulations!</h2>
            <p>Correct Answer: APPLES</p>
            <p>Score: 1337</p>
            <p>Post to leaderboard -> </p>
            <p>Or</p>
            <p>Try again</p>
          </div>
        );
      } else {
        // No subarray where all objects have the property background: 'lightgreen'
      }
    if (items.length === 7) {
      return (
        <div className="gameEnd">
          <h2>Game Over</h2>
          <p>Correct Answer: APPLES</p>
          <p>Try again?</p>
        </div>
      );
    }
}