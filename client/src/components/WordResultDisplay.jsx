export default function WordResultDisplay({ guesses }) {
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
