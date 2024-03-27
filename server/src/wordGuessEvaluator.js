// This function takes in a user's input and the correct answer and
//returns an array of objects that represent the evaluation of the user's input.

const wordGuessEvaluator = (req, res) => {
  const { userInput, correctAnswer } = req.query;

  if (!userInput || !correctAnswer) {
    return res.json([]);
  }

  let userInputArray = userInput.toUpperCase().split('');
  let correctAnswerArray = correctAnswer.toUpperCase().split('');

  let result = [];
  let duplicateCounter = 0;

  for (let i = 0; i < correctAnswerArray.length; i++) {
    if (userInputArray[i] === correctAnswerArray[i]) {
      result.push({
        letter: userInputArray[i],
        color: 'green',
        background: 'lightgreen',
        result: 'correct',
      });
    } else if (correctAnswerArray.includes(userInputArray[i])) {
      if (
        userInputArray.filter((char) => char === userInputArray[i]).length >
        correctAnswerArray.filter((char) => char === userInputArray[i]).length +
          duplicateCounter
      ) {
        duplicateCounter++;
        result.push({
          letter: userInputArray[i],
          color: 'red',
          background: 'lightpink',
          result: 'incorrect',
        });
      } else {
        result.push({
          letter: userInputArray[i],
          color: 'yellow',
          background: 'lightgoldenrodyellow',
          result: 'misplaced',
        });
      }
    } else {
      result.push({
        letter: userInputArray[i],
        color: 'red',
        background: 'lightpink',
        result: 'incorrect',
      });
    }
  }

  res.json(result);
};

export default wordGuessEvaluator;
