import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import wordGuessEvaluator from './src/wordGuessEvaluator.js';
import wordListGenerator from './src/wordListGenerator.js';
import wordGenerator from './src/wordGenerator.js';

const WORDS = wordListGenerator();
const WORDS_LENGHT_3 = WORDS.filter((word) => word.length === 3);
const WORDS_LENGHT_4 = WORDS.filter((word) => word.length === 4);
const WORDS_LENGHT_5 = WORDS.filter((word) => word.length === 5);
const WORDS_LENGHT_6 = WORDS.filter((word) => word.length === 6);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const html = await fs.readFile('../client/dist/index.html');
  res.type('html').send(html);
});

app.get('/api/word-guess-evaluator', wordGuessEvaluator);

app.get('/api/word-generator', (req, res) => {
  const length = parseInt(req.query.length);
  const duplicates = req.query.duplicates === 'true';
  res.json(
    wordGenerator(
      length,
      duplicates,
      WORDS_LENGHT_3,
      WORDS_LENGHT_4,
      WORDS_LENGHT_5,
      WORDS_LENGHT_6
    )
  );
});

app.use('/assets', express.static('../client/dist/assets'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
