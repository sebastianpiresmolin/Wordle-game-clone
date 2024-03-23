import { useState, useEffect } from 'react';
import './App.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import WordGuessEvaluator from './components/WordGuessEvaluator';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';
import GamePointsAndTime from './components/GamePointsAndTime';

function App() {
  const [guesses, setGuess] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState('APPLES');

  const [userInput, setUserInput] = useState();

  const [wordParams, setWordParams] = useState({ length: 6, duplicates: true });

  const [pointsAndTime, setPointsAndTime] = useState({
    points: 100,
    time: 60,
});

  useEffect(() => {
    const result = WordGuessEvaluator({ userInput, correctAnswer });
    if (Array.isArray(result)) {
      const updatedGuesses = [...guesses, result];
      setGuess(updatedGuesses);
      console.log(updatedGuesses);
    }
  }, [userInput, correctAnswer]);

  // I had to create a useEffect here because for some reason there are
  //guesses added to the guesses array that are not supposed to be there
  //upon initializing the app and I couldnt find the culprit
  useEffect(() => {
    setGuess([]);
  }, []);

  function handleCreateGuess(newGuess) {
    setUserInput(newGuess);
  }

  function handleDuplicateButtonClick(newDuplicateValue) {
    setWordParams({ ...wordParams, duplicates: newDuplicateValue });
  }

  function handleWordLengthButtonClick(newLength) {
    setWordParams({ ...wordParams, length: newLength });
  }

  function handleResetGuesses() {
    setGuess([]);
    setPointsAndTime({ ...pointsAndTime, time: 60 });
  }

  return (
    <div className="app">
      <h1 className="app_title">Wordle</h1>
      <GameSetup
        guesses={guesses}
        onDuplicateButtonClick={handleDuplicateButtonClick}
        onLengthButtonClick={handleWordLengthButtonClick}
      />
      <GamePointsAndTime guesses={guesses} pointsAndTime={pointsAndTime} onTimeEnd={(newTime) => setPointsAndTime({...pointsAndTime,
    time: newTime})} />
      <GameEnd guesses={guesses} resetGuesses={handleResetGuesses} />
      <WordResultDisplay guesses={guesses} />
      <WordInput onCreateItem={handleCreateGuess} />
    </div>
  );
}

export default App;
