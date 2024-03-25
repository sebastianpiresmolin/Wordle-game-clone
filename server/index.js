import express from 'express';
import cors from 'cors';
import WordGuessEvaluator from './src/WordGuessEvaluator.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/word-guess-evaluator', WordGuessEvaluator);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
