//Provide the user with options to set up the game before starting.

export default function GameSetup({
  guesses,
  onLengthButtonClick,
  onDuplicateButtonClick,
  wordParams,
}) {
  if (guesses.length === 0) {
    return (
      <div className="gameSetup">
        <div className="setupHeaders">
          <h1>
            Do you know your <span className="greenLetter">A</span>
            <span className="yellowLetter">B</span>
            <span className="redLetter">C</span>'s?
          </h1>
          <h2>
            <span className="greenLetter">P</span>lay Wordle now and beat your
            fr
            <span className="yellowLetter">i</span>ends on the leaderboard
            <span className="redLetter">s</span>
          </h2>
        </div>
        <div className="setupButtons">
          <div className="lengthButtons">
            <h3>Length of word?</h3>
            <button onClick={() => onLengthButtonClick(3)}>3</button>
            <button onClick={() => onLengthButtonClick(4)}>4</button>
            <button onClick={() => onLengthButtonClick(5)}>5</button>
            <button onClick={() => onLengthButtonClick(6)}>6</button>
          </div>
          <div className="duplicateButtons">
            <h3>Allow duplicates?</h3>
            <button onClick={() => onDuplicateButtonClick(true)}>Yes</button>
            <button onClick={() => onDuplicateButtonClick(false)}>No</button>
          </div>
        </div>
        <h3 className="setupStartGame">The game and timer starts upon your first guess</h3>
      </div>
    );
  }
}
