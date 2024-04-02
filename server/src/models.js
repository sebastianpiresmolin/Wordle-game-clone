import mongoose from 'mongoose';

const highscore = mongoose.model('Highscore', {
  text: String,
  points: Number,
  guesses: Array,
  gameStart: Date,
  gameEnd: Date,
  settings: {
    duplicates: Boolean,
    length: Number,
  },
});

export { highscore };
