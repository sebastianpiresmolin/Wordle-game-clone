import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { highscore } from './src/models.js';
import { engine } from 'express-handlebars';
import wordGuessEvaluator from './src/wordGuessEvaluator.js';
import wordListGenerator from './src/wordListGenerator.js';
import wordGenerator from './src/wordGenerator.js';
import renderPage from './src/renderPage.js';

const WORDS = wordListGenerator();
const WORDS_LENGHT_3 = WORDS.filter((word) => word.length === 3);
const WORDS_LENGHT_4 = WORDS.filter((word) => word.length === 4);
const WORDS_LENGHT_5 = WORDS.filter((word) => word.length === 5);
const WORDS_LENGHT_6 = WORDS.filter((word) => word.length === 6);

config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  renderPage(res, 'index');
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

app.post('/api/leaderboard', async (req, res) => {
  const highscoreData = req.body;
  console.log(req.body);

  const highscoreModel = new highscore(highscoreData);
  await highscoreModel.save();

  res.status(201).json(highscoreData);
});

app.use('/assets', express.static('../client/dist/assets'));
app.use('/src', express.static('../client/src'));

const port = process.env.PORT || 5080;
app.listen(port, () => console.log(`Server running on port ${port}`));
