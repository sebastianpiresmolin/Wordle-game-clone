import { useState, useEffect } from 'react';
import './App.css';
import './main.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';
import GamePointsAndTime from './components/GamePointsAndTime';

function App() {
  /* ------------------ STATES ------------------*/
  const [guesses, setGuess] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();

  const [userInput, setUserInput] = useState();
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

  const [allGreen, setAllGreen] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [endTimeSet, setEndTimeSet] = useState(false);
  /* ------------------ /STATES ------------------*/

  /* ------------------ FUNCTIONS ------------------*/
  // I had to create a useEffect here because for some reason there are
  //guesses added to the guesses array that are not supposed to be there
  //upon initializing the app and I couldnt find the culprit
  useEffect(() => {
    setGuess([]);
  }, []);

  useEffect(() => {
    if (allGreen && !endTimeSet) {
      handleGameEnd();
      setEndTimeSet(true);
    }
  }, [allGreen, endTimeSet, handleGameEnd]);

  // useEffect to evaluate the user input and recieve the result from the evaluator
  // as it is now its easy to cheat by looking at the url in the browser
  useEffect(() => {
    const fetchResult = async () => {
      if (userInput !== undefined && correctAnswer !== undefined) {
        const response = await fetch(
          `/api/word-guess-evaluator?userInput=${encodeURIComponent(
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
      `/api/word-generator?length=${wordParams.length}&duplicates=${wordParams.duplicates}`
    );
    const word = await response.json();
    setCorrectAnswer(word.toString());
  }
  useEffect(() => {
    fetchWord();
  }, [wordParams]);

  useEffect(() => {
    if (allGreen && !endTimeSet) {
      setEndTime(new Date());
      setEndTimeSet(true);
    }
  }, [allGreen, endTimeSet]);

  // Console logs DELETE THESE BEFORE DISTRIBUTION

  useEffect(() => {
    console.log(correctAnswer);
  }, [correctAnswer]);

  useEffect(() => {
    console.log(guesses);
  }, [result]);

  useEffect(() => {
    console.log('start time', startTime);
  }, [startTime]);

  useEffect(() => {
    console.log('end time', endTime);
  }, [endTime]);
  // Console logs DELETE THESE BEFORE DISTRIBUTION

  function handleCreateGuess(newGuess) {
    if (guesses.length === 0) {
      setStartTime(new Date());
    }
    if (allGreen) {
      setEndTime(new Date());
    }
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
    setEndTimeSet(false);
    setUserInput();
    setPointsAndTime({ ...pointsAndTime, time: 60 });
    fetchWord();
  }

  function handleGameEnd() {
    if (!endTime) {
      // Only set the end time if it's not already set
      setEndTime(new Date());
    }
  }

  function handleOnTimeEnd(newTime) {
    const currentPoints = pointsAndTime.points;

    setPointsAndTime({ ...pointsAndTime, time: 60 });
    setResults({
      time: newTime,
      points: currentPoints - result.time * 5 - (guesses.length - 1) * 50,
    });
  }

  function handleCreateLeaderboardItem(name) {
    const newItem = {
      text: name,
      points: result.points,
      guesses: guesses,
      gameStart: startTime,
      gameEnd: endTime,
      settings: wordParams,
    };

    fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
  }
  /* ------------------ /FUNCTIONS ------------------*/

  /* ------------------ RENDER ------------------*/
  return (
    <div className="app">
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
        handleGameEnd={handleGameEnd}
        onCreateItem={handleCreateLeaderboardItem}
      />
      <WordResultDisplay guesses={guesses} />
      <WordInput onCreateItem={handleCreateGuess} guesses={guesses} />
    </div>
  );
}

/* ------------------ /RENDER ------------------*/

export default App;
