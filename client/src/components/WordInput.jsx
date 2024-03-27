// Input form for user to enter a word guess

import { useState } from 'react';

export default function WordInput({ onCreateItem, guesses }) {
  const allGreen = guesses.some(
    (subArray) =>
      subArray.length > 0 &&
      subArray.every((item) => item.background === 'lightgreen')
  );
  const [text, setText] = useState('');
  if (allGreen || guesses.length >= 5) {
    return null;
  }
    return (
      <form
        className="GuessForm"
        onSubmit={(ev) => {
          ev.preventDefault();
          onCreateItem(text);
          setText('');
        }}
      >
        <input
          className="guessForm__input"
          type="text"
          value={text}
          placeholder="Guess a word"
          onChange={(ev) => {
            setText(ev.target.value);
          }}
        />
        <button className="guessForm__submitButton" type="submit">
          Try
        </button>
      </form>
    );
  }

