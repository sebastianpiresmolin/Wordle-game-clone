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
      console.log(updatedItems);
    }
  }, [userInput, correctAnswer]);
  
// I had to create a useEffect here because for some reason there are
//items added to the items array that are not supposed to be there
//and after trying to find out why i couldnt find the culprit
  useEffect(() => {
    setItems([]); 
  }, []);

  function handleCreateGuess(newGuess) {
    setUserInput(newGuess);
  }

  return (
    <div className="app">
      <h1 className="app_title">Wordle</h1>
      <GameSetup items={items} />
      <GameEnd items={items} resetItems={() => setItems([])} />
      <WordResultDisplay items={items} />
      <WordInput onCreateItem={handleCreateGuess} />
    </div>
  );
}

export default App;
