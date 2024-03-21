export default function WordResultDisplay({ items }) {
  const numberOfBoxes = 6;
  // Create an array with 'numberOfBoxes' elements, map over it, and return a div for each
  const boxes = [...Array(numberOfBoxes)].map((_, index) => (
    <div key={index} className={`rowBox${index + 1}`}></div>
  ));
  return (
    <div>
      {items.map((itemArray, arrayIndex) => {
        return (
          <ul className="guessList" key={arrayIndex}>
            {itemArray.map((item, index) => {
              return (
                <li
                  className="guessListItem"
                  key={index}
                  style={{ color: item.color }}
                >
                  {item.letter}
                </li>
              );
            })}
          </ul>
        );
      })}
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
      <div className="resultBoxRow">{boxes}</div>
    </div>
  );
}
