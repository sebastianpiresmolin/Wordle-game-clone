export default function GameSetup({ guesses, onLengthButtonClick, onDuplicateButtonClick }) {
  if (guesses.length === 0) {
    return (
      <div className="gameSetup">
        <h2>Game Setup</h2>
        <p>Rules:</p>
        <ul>
          <li>You have 6 chances to guess the word</li>
          <li>Green: correct letter in the correct position</li>
          <li>Yellow: correct letter in the wrong position</li>
          <li>Red: incorrect letter</li>
        </ul>
        <p>Length of word?</p>
        <div className="lengthButtons">
          <button onClick={() => onLengthButtonClick(3)}>3</button>
          <button onClick={() => onLengthButtonClick(4)}>4</button>
          <button onClick={() => onLengthButtonClick(5)}>5</button>
          <button onClick={() => onLengthButtonClick(6)}>6</button>
        </div>
        <p>Allow duplicates?</p>
        <div className="duplicateButtons">
          <button onClick={() => onDuplicateButtonClick(true)}>Yes</button>
          <button onClick={() => onDuplicateButtonClick(false)}>No</button>
        </div>
        <p>The game and timer starts upon your first guess</p>
      </div>
    );
  }
}
