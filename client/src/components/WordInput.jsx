import { useState } from 'react';

export default function WordInput({ onCreateItem }) {
  const [text, setText] = useState('');
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
