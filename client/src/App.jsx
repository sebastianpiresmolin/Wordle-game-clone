import { useState, useEffect } from 'react';
import './App.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import WordGuessEvaluator from './components/WordGuessEvaluator';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';
import GamePointsAndTime from './components/GamePointsAndTime';

function App() {
  /* ------------------ STATES ------------------*/
  // state for guesses items
  const [guesses, setGuess] = useState([]);
  // state for current correct answer
  const [correctAnswer, setCorrectAnswer] = useState('LAPTOP');
  // state for user input from the input field
  const [userInput, setUserInput] = useState();
  // state for word params to be passed to the word generator
  const [wordParams, setWordParams] = useState({
    length: 6,
    duplicates: true,
  });
  // state for points and time DEFAULTS
  const [pointsAndTime, setPointsAndTime] = useState({
    points: 100,
    time: 60,
  });
  // state for result to calculate user score
  const [result, setResults] = useState({
    time: 60,
    points: 100,
  });
  /* ------------------ /STATES ------------------*/

  /* ------------------ USE EFFECTS ------------------*/
  // useEffect to evaluate the user input and recieve the result from the evaluator
  // without rendering the result to the DOM (which made react very angry)
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

  useEffect(() => {
    console.log(result);
  }, [result]);
  /* ------------------ /USE EFFECTS ------------------*/

  /* ------------------ FUNCTIONS ------------------*/
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

  function handleOnTimeEnd(newTime) {
    const currentPoints = pointsAndTime.points;

    setPointsAndTime({ ...pointsAndTime, time: 60 });
    setResults({
      time: newTime,
      points: currentPoints - (60 - result.time) - (guesses.length - 1) * 5,
    });
  }
  /* ------------------ /FUNCTIONS ------------------*/

  /* ------------------ RENDER ------------------*/
  return (
    <div className="app">
      <h1 className="app_title">Wordle</h1>
      <GameSetup
        guesses={guesses}
        onDuplicateButtonClick={handleDuplicateButtonClick}
        onLengthButtonClick={handleWordLengthButtonClick}
      />
      <GamePointsAndTime
        guesses={guesses}
        pointsAndTime={pointsAndTime}
        onTimeEnd={handleOnTimeEnd}
      />
      <GameEnd
        guesses={guesses}
        resetGuesses={handleResetGuesses}
        result={result}
      />
      <WordResultDisplay guesses={guesses} />
      <WordInput onCreateItem={handleCreateGuess} />
    </div>
  );
}

/* ------------------ /RENDER ------------------*/

export default App;
