import React, { useState } from 'react';

export default function GameSetup({
  guesses,
  onLengthButtonClick,
  onDuplicateButtonClick,
}) {
  const [activeLength, setActiveLength] = useState(6);
  const [activeDuplicate, setActiveDuplicate] = useState(true);

  const handleLengthButtonClick = (length) => {
    setActiveLength(length);
    onLengthButtonClick(length);
  };

  const handleDuplicateButtonClick = (allowDuplicate) => {
    setActiveDuplicate(allowDuplicate);
    onDuplicateButtonClick(allowDuplicate);
  };

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
            {[3, 4, 5, 6].map((length) => (
              <button
                key={length}
                className={length === activeLength ? 'active' : ''}
                onClick={() => handleLengthButtonClick(length)}
              >
                {length}
              </button>
            ))}
          </div>
          <div className="duplicateButtons">
            <h3>Allow duplicates?</h3>
            {[true, false].map((allowDuplicate) => (
              <button
                key={allowDuplicate}
                className={allowDuplicate === activeDuplicate ? 'active' : ''}
                onClick={() => handleDuplicateButtonClick(allowDuplicate)}
              >
                {allowDuplicate ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <h3 className="setupStartGame">
          The game and timer starts upon your first guess<br></br>
          You got 5 guesses to get the word right
        </h3>
      </div>
    );
  }
}
