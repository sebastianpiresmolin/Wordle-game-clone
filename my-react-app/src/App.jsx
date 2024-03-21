import { useState, useEffect } from 'react';
import './App.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import WordGuessEvaluator from './components/WordGuessEvaluator';

function App() {
  const [items, setItems] = useState([
    [
      {
        letter: 'A',
        color: 'red',
      },
      {
        letter: 'B',
        color: 'green',
      },
      {
        letter: 'C',
        color: 'red',
      },
      {
        letter: 'D',
        color: 'yellow',
      },
      {
        letter: 'E',
        color: 'red',
      },
      {
        letter: 'F',
        color: 'red',
      },
    ],
    [
      {
        letter: 'A',
        color: 'red',
      },
      {
        letter: 'B',
        color: 'green',
      },
      {
        letter: 'C',
        color: 'red',
      },
      {
        letter: 'D',
        color: 'yellow',
      },
      {
        letter: 'E',
        color: 'red',
      },
      {
        letter: 'F',
        color: 'red',
      },
    ],
  ]);

  const [correctAnswer, setCorrectAnswer] = useState('APPLES');

  const [userInput, setUserInput] = useState('Hellos');

  useEffect(() => {
    const result = WordGuessEvaluator({ userInput, correctAnswer });
    if (Array.isArray(result)) {
      const updatedItems = [
        ...items,
        result,
      ];
      setItems(updatedItems);
    }
  }, [userInput, correctAnswer]);

  function handleCreateGuess(newGuess) {
    setUserInput(newGuess);
  }

  return (
    <div className="app">
      <h1 className="app_title">Wordle</h1>
      <WordResultDisplay items={items} />
      <WordInput onCreateItem={handleCreateGuess} />
    </div>
  );
}

export default App;
