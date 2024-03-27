export default function wordGenerator(
  length,
  hasDuplicates,
  wordsLength3,
  wordsLength4,
  wordsLength5,
  wordsLength6
) {
  let results = [];
  let duplicates = hasDuplicates;

  if (length === 3) {
    results = wordsLength3;
  } else if (length === 4) {
    results = wordsLength4;
  } else if (length === 5) {
    results = wordsLength5;
  } else if (length === 6) {
    results = wordsLength6;
  }

  if (duplicates === false) {
    results = results.filter((currentValue) => {
      return currentValue.split('').every((char, index, self) => {
        return self.indexOf(char) === index;
      });
    });
  }

  let randomizer = Math.floor(Math.random() * results.length);
  return results[randomizer];
}
