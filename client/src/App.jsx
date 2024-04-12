import { useState, useEffect } from 'react';
import './App.css';
import './main.css';
import WordResultDisplay from './components/WordResultDisplay';
import WordInput from './components/WordInput';
import GameEnd from './components/GameEnd';
import GameSetup from './components/GameSetup';
import GamePointsAndTime from './components/GamePointsAndTime';

function App() {
  //
  //
  //
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
  //
  //
  //
  /* ------------------ FUNCTIONS ------------------*/
  // I had to create a useEffect here because for some reason there are
  //guesses added to the guesses array that are not supposed to be there
  //upon initializing the app and I couldnt find the culprit.
  //Maybe its only in the dev environment
  useEffect(() => {
    setGuess([]);
  }, []);

  // useEffect to check if all guesses are correct
  // and if so, set the end time and call handleGameEnd
  useEffect(() => {
    if (allGreen && !endTimeSet) {
      handleGameEnd();
      setEndTimeSet(true);
    }
  }, [allGreen, endTimeSet, handleGameEnd]);

  // evaluate the user input and recieve the result from the evaluator
  useEffect(() => {
    const fetchResult = async () => {
      if (userInput !== undefined) {
        const response = await fetch(
          `/api/word-guess-evaluator?userInput=${encodeURIComponent(userInput)}`
        );
        const result = await response.json();
        if (Array.isArray(result)) {
          setGuess((prevGuesses) => [...prevGuesses, result]);
        }
      }
    };
    fetchResult();
  }, [userInput]);

  // generate word on backend
  async function generateWord() {
    await fetch(
      `/api/generate-word?length=${wordParams.length}&duplicates=${wordParams.duplicates}`
    );
  }

  //call generateWord when wordParams (game settings) change
  useEffect(() => {
    generateWord();
  }, [wordParams]);

  // check if all guesses are correct
  useEffect(() => {
    if (allGreen && !endTimeSet) {
      setEndTime(new Date());
      setEndTimeSet(true);
    }
  }, [allGreen, endTimeSet]);

  // function to handle the creation of a guess and save times
  async function handleCreateGuess(newGuess) {
    if (guesses.length === 0) {
      setStartTime(new Date());
    }
    if (allGreen) {
      setEndTime(new Date());
    }
    setUserInput(newGuess);
    if (guesses.length <= 5) {
      const correctAnswer = await fetch('/api/correct-answer');
      const newCorrectAnswer = await correctAnswer.text();
      setCorrectAnswer(newCorrectAnswer);
    }
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
    generateWord();
    setEndTime();
  }

  // function to handle the end of the game. This function will set the end time
  // and fetch the correct answer from the backend after the game ends
  // so that the user can see the correct answer but not before the game ends
  async function handleGameEnd() {
    if (!endTime) {
      setEndTime(new Date());
    }
    const correctAnswer = await fetch('/api/correct-answer');
    const newCorrectAnswer = await correctAnswer.text();
    setCorrectAnswer(newCorrectAnswer);
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
