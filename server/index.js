import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { highscore } from './src/models.js';
import { engine } from 'express-handlebars';
import wordGuessEvaluator from './src/wordGuessEvaluator.js';
import wordListGenerator from './src/wordListGenerator.js';
import wordGenerator from './src/wordGenerator.js';

const WORDS = wordListGenerator();
const WORDS_LENGHT_3 = WORDS.filter((word) => word.length === 3);
const WORDS_LENGHT_4 = WORDS.filter((word) => word.length === 4);
const WORDS_LENGHT_5 = WORDS.filter((word) => word.length === 5);
const WORDS_LENGHT_6 = WORDS.filter((word) => word.length === 6);

export let correctAnswer;

config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');
app.use(cors());
app.use(express.json());

const MENU = [
  {
    label: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    label: 'About',
    link: '/about',
  },
];

async function renderPage(res, page) {
  const currentPath = page == 'index' ? '/' : `/${page}`;
  res.render(page, {
    menuItems: MENU.map((item) => {
      return {
        active: currentPath == item.link,
        label: item.label,
        link: item.link,
      };
    }),
  });
}

async function renderLeaderboard(res, page) {
  const currentPath = page == 'index' ? '/' : `/${page}`;
  res.render(page, {
    menuItems: MENU.map((item) => {
      return {
        active: currentPath == item.link,
        label: item.label,
        link: item.link,
      };
    }),
    highscores_3: highscores_3
      .map((score) => score.toObject())
      .map((score) => ({
        name: score.text,
        points: score.points,
        length: score.settings.length,
      })),
    highscores_4: highscores_4
      .map((score) => score.toObject())
      .map((score) => ({
        name: score.text,
        points: score.points,
        length: score.settings.length,
      })),
    highscores_5: highscores_5
      .map((score) => score.toObject())
      .map((score) => ({
        name: score.text,
        points: score.points,
        length: score.settings.length,
      })),
    highscores_6: highscores_6
      .map((score) => score.toObject())
      .map((score) => ({
        name: score.text,
        points: score.points,
        length: score.settings.length,
      })),
  });
}

app.get('/', async (req, res) => {
  renderPage(res, 'index');
});

app.get('/about', async (req, res) => {
  renderPage(res, 'about');
});

app.get('/api/word-guess-evaluator', wordGuessEvaluator);

app.get('/api/word-generator', (req, res) => {
  const length = parseInt(req.query.length);
  const duplicates = req.query.duplicates === 'true';
  correctAnswer = wordGenerator(
    length,
    duplicates,
    WORDS_LENGHT_3,
    WORDS_LENGHT_4,
    WORDS_LENGHT_5,
    WORDS_LENGHT_6
  );
  console.log(correctAnswer);

  // Send the generated word as a response
  res.send(correctAnswer);
});

let highscores_3, highscores_4, highscores_5, highscores_6;

async function fetchHighscores() {
  highscores_3 = await highscore
    .find({ 'settings.length': 3 })
    .sort({ score: -1 })
    .limit(10);
  highscores_4 = await highscore
    .find({ 'settings.length': 4 })
    .sort({ score: -1 })
    .limit(10);
  highscores_5 = await highscore
    .find({ 'settings.length': 5 })
    .sort({ score: -1 })
    .limit(10);
  highscores_6 = await highscore
    .find({ 'settings.length': 6 })
    .sort({ score: -1 })
    .limit(10);
}

app.get('/leaderboard', async (req, res) => {
  await fetchHighscores();
  renderLeaderboard(res, 'leaderboard');
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
