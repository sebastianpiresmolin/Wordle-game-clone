export default function GameSetup({ guesses, onLengthButtonClick, onDuplicateButtonClick, wordParams }) {
  if (guesses.length === 0) {
    return (
      <div className="gameSetup">
        <h2>Guess the Word!</h2>
        <p>Length of word?</p>
        <div className="lengthButtons">
          <p>Selected: {wordParams.length}</p>
          <button onClick={() => onLengthButtonClick(3)}>3</button>
          <button onClick={() => onLengthButtonClick(4)}>4</button>
          <button onClick={() => onLengthButtonClick(5)}>5</button>
          <button onClick={() => onLengthButtonClick(6)}>6</button>
        </div>
        <p>Allow duplicates?</p>
        <p>Selected: {wordParams.duplicates.toString()}</p>
        <div className="duplicateButtons">
          <button onClick={() => onDuplicateButtonClick(true)}>Yes</button>
          <button onClick={() => onDuplicateButtonClick(false)}>No</button>
        </div>
        <p>The game and timer starts upon your first guess</p>
      </div>
    );
  }
}
