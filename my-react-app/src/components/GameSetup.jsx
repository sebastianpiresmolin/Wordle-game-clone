export default function GameSetup({ items }) {
  if (items.length === 0) {
    return (
      <div className="gameSetup">
        <h2>Game Setup</h2>
        <p>Guess the word</p>
        <p>Rules:</p>
        <ul>
          <li>You have 6 chances to guess the word</li>
          <li>Green: correct letter in the correct position</li>
          <li>Yellow: correct letter in the wrong position</li>
          <li>Red: incorrect letter</li>
        </ul>
        <p>Length of word</p>
        <div className="lengthButtons">
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
        </div>
        <p>Allow duplicates?</p>
        <div className="duplicateButtons">
          <button>Yes</button>
          <button>No</button>
        </div>
        <p>The game and timer starts upon your first guess</p>
      </div>
    );
  }
}
