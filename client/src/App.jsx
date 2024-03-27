import { useState, useEffect } from 'react';
import './App.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';
import GamePointsAndTime from './components/GamePointsAndTime';

function App() {
  /* ------------------ STATES ------------------*/
  // state for guesses items
  const [guesses, setGuess] = useState([]);
  // state for current correct answer
  const [correctAnswer, setCorrectAnswer] = useState();
  // state for user input from the input field
  const [userInput, setUserInput] = useState();
  // state for word params to be passed to the word generator
  const [wordParams, setWordParams] = useState({
    length: 6,
    duplicates: true,
  });
  // state for points and time DEFAULTS
  const [pointsAndTime, setPointsAndTime] = useState({
    points: 1000,
    time: 0,
  });
  // state for result to calculate user score
  const [result, setResults] = useState({
    time: 0,
    points: 1000,
  });
  /* ------------------ /STATES ------------------*/

  /* ------------------ FUNCTIONS ------------------*/

  // useEffect to fetch the correct answer from the word generator
  useEffect(() => {
    async function fetchWord() {
      const response = await fetch(
        `http://localhost:3000/api/word-generator=${wordParams.length}&duplicates=${wordParams.duplicates}`
      );
      const word = await response.json();
      setCorrectAnswer(word.toString());
    }
  }, [wordParams]);

  // I had to create a useEffect here because for some reason there are
  //guesses added to the guesses array that are not supposed to be there
  //upon initializing the app and I couldnt find the culprit
  useEffect(() => {
    setGuess([]);
  }, []);

  // useEffect to evaluate the user input and recieve the result from the evaluator
  useEffect(() => {
    const fetchResult = async () => {
      if (userInput !== undefined && correctAnswer !== undefined) {
        const response = await fetch(
          `http://localhost:3000/api/word-guess-evaluator?userInput=${encodeURIComponent(
            userInput
          )}&correctAnswer=${encodeURIComponent(correctAnswer)}`
        );
        const result = await response.json();
        if (Array.isArray(result)) {
          setGuess((prevGuesses) => [...prevGuesses, result]);
        }
      }
    };
    fetchResult();
  }, [userInput, correctAnswer]);

  async function fetchWord() {
    const response = await fetch(
      `http://localhost:3000/api/word-generator?length=${wordParams.length}&duplicates=${wordParams.duplicates}`
    );
    const word = await response.json();
    setCorrectAnswer(word.toString());
  }
  useEffect(() => {
    fetchWord();
  }, [wordParams]);

  // Console logs DELETE THESE BEFORE DISTRIBUTION

  useEffect(() => {
    console.log(correctAnswer);
  }, [correctAnswer]);

  useEffect(() => {
    console.log(guesses);
  }, [result]);
  // Console logs DELETE THESE BEFORE DISTRIBUTION

  function handleCreateGuess(newGuess) {
    setUserInput(newGuess);
  }

  function handleDuplicateButtonClick(newDuplicateValue) {
    setWordParams((prevParams) => ({
      ...prevParams,
      duplicates: newDuplicateValue,
    }));
  }

  function handleWordLengthButtonClick(newLength) {
    setWordParams((prevParams) => ({ ...prevParams, length: newLength }));
  }

  function handleResetGuesses() {
    setGuess([]);
    setUserInput();
    setPointsAndTime({ ...pointsAndTime, time: 60 });
    fetchWord();
  }

  function handleOnTimeEnd(newTime) {
    const currentPoints = pointsAndTime.points;

    setPointsAndTime({ ...pointsAndTime, time: 60 });
    setResults({
      time: newTime,
      points: currentPoints - result.time * 5 - (guesses.length - 1) * 50,
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
        wordParams={wordParams}
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
        correctAnswer={correctAnswer}
      />
      <WordResultDisplay guesses={guesses} />
      <WordInput onCreateItem={handleCreateGuess} guesses={guesses} />
    </div>
  );
}

/* ------------------ /RENDER ------------------*/

export default App;
