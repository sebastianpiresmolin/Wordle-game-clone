import { useState, useEffect } from 'react';
import './App.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import WordGuessEvaluator from './components/WordGuessEvaluator';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';

function App() {
  const [items, setItems] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState('APPLES');

  const [userInput, setUserInput] = useState();

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
      <GameSetup items={items} />
      <GameEnd items={items} />
      <WordResultDisplay items={items} />
      <WordInput onCreateItem={handleCreateGuess} />
    </div>
  );
}

export default App;
