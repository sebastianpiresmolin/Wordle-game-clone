export default function WordResultDisplay() {
  const numberOfBoxes = 6;
  const firstGuess = [{letter: 'O', color: 'green'}, {letter: 'R', color: 'yellow'}, {letter: 'A', color: 'green'}, {letter: 'N', color: 'green'}, {letter: 'G', color: 'green'}, {letter: 'E', color: 'green'}]
  const secondGuess = [{letter: 'O', color: 'green'}, {letter: 'R', color: 'green'}, {letter: 'A', color: 'green'}, {letter: 'N', color: 'green'}, {letter: 'G', color: 'green'}, {letter: 'E', color: 'green'}]
  const thirdGuess = [{letter: 'O', color: 'green'}, {letter: 'R', color: 'green'}, {letter: 'A', color: 'green'}, {letter: 'N', color: 'green'}, {letter: 'G', color: 'green'}, {letter: 'E', color: 'green'}]
  const fourthGuess = [{letter: 'O', color: 'yellow'}, {letter: 'R', color: 'red'}, {letter: 'A', color: 'green'}, {letter: 'N', color: 'green'}, {letter: 'G', color: 'green'}, {letter: 'E', color: 'green'}]
  const fifthGuess = [{letter: 'O', color: 'red'}, {letter: 'R', color: 'green'}, {letter: 'A', color: 'green'}, {letter: 'N', color: 'green'}, {letter: 'G', color: 'green'}, {letter: 'E', color: 'green'}]


  // Create an array with 'numberOfBoxes' elements, map over it, and return a div for each
  const boxes = [...Array(numberOfBoxes)].map((_, index) => (
    <div key={index} className={`rowBox${index + 1}`}></div>
  ));

  const firstGuessDisplay = firstGuess.map((guess, index) => (
    <span key={index} style={{color: guess.color}}>{guess.letter}</span>
  ));

  const secondGuessDisplay = secondGuess.map((guess, index) => (
    <span key={index} style={{color: guess.color}}>{guess.letter}</span>
  ));

  const thirdGuessDisplay = thirdGuess.map((guess, index) => (
    <span key={index} style={{color: guess.color}}>{guess.letter}</span>
  ));

  const fourthGuessDisplay = fourthGuess.map((guess, index) => (
    <span key={index} style={{color: guess.color}}>{guess.letter}</span>
  ));

  const fifthGuessDisplay = fifthGuess.map((guess, index) => (
    <span key={index} style={{color: guess.color}}>{guess.letter}</span>
  ));

  return (
    <div className="resultBoxesContainer">
      <div className="guesses">
      <div className="firstGuess">{firstGuessDisplay}</div>
      <div className="secondGuess">{secondGuessDisplay}</div>
      <div className="thirdGuess">{thirdGuessDisplay}</div>
      <div className="fourthGuess">{fourthGuessDisplay}</div>
      <div className="fifthGuess">{fifthGuessDisplay}</div>
      </div>  
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
    </div>
  );
}
