// Purpose: Generate a list of words from a text file.
// I had to use .trim() to remove the whitespace from the words

import fs from 'fs';

export default function wordListGenerator() {
  try {
    const data = fs.readFileSync('src/words_alpha.txt', 'utf8');
    const words = data.split('\n').map(word => word.trim());
    return words;
  } catch (err) {
    console.error(err);
    return [];
  }
};


