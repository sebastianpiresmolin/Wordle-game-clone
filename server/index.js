import express from 'express';
import cors from 'cors';
import wordGuessEvaluator from './src/wordGuessEvaluator.js';
import wordListGenerator from './src/wordListGenerator.js';

const WORDS = wordListGenerator();
const WORDS_LENGHT_3 = WORDS.filter((word) => word.length === 3);
const WORDS_LENGHT_4 = WORDS.filter((word) => word.length === 4);
const WORDS_LENGHT_5 = WORDS.filter((word) => word.length === 5);
const WORDS_LENGHT_6 = WORDS.filter((word) => word.length === 6);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/word-guess-evaluator', wordGuessEvaluator);

app.get('/api/word-generator', (req, res) => {
  const length = req.query.length;
  const duplicates = req.query.duplicates;
  console.log(length, duplicates);

  res.json({ length, duplicates });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
