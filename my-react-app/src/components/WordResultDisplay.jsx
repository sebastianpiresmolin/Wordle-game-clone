export default function WordResultDisplay({ guesses }) {
  const numberOfBoxes = 6;
  // Create an array with 'numberOfBoxes' elements, map over it, and return a div for each
  const boxes = [...Array(numberOfBoxes)].map((_, index) => (
    <div key={index} className={`rowBox${index + 1}`}></div>
  ));
  return (
    <div className="guessContainer">
      {guesses.map((itemArray, arrayIndex) => {
        return (
          <ul className="guessList" key={arrayIndex}>
            {itemArray.map((item, index) => {
              return (
                <li
                  className="guessListItem"
                  key={index}
                  style={{
                    color: item.color,
                    backgroundColor: item.background,
                  }}
                >
                  {item.letter}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
