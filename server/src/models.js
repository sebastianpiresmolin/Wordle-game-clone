import mongoose from 'mongoose';

const item = mongoose.model('Item', {
  name: String,
  guesses: Array,
  gameStart: Date,
  gameEnd: Date,
  settings: {
    duplicates: Boolean,
    length: Number,
  },
});

export { item };
