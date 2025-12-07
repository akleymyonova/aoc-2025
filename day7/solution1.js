import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const START_CHAR = 'S';
const SPLITTER_CHAR = '^';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

const startIndex = parsedInput[0].indexOf(START_CHAR);
const lineLength = parsedInput[0].length;

let splits = 0;

let currentSplitIndexes = [startIndex];

for (let i = 2; i < parsedInput.length; i+=2) {
  const newSplitIndexes = [];

  for (const index of currentSplitIndexes) {
    if (parsedInput[i][index] === SPLITTER_CHAR) {
      splits++;
      newSplitIndexes.push(index - 1);
      newSplitIndexes.push(index + 1);
    } else {
      newSplitIndexes.push(index);
    }
  }
  currentSplitIndexes = Array.from(new Set(newSplitIndexes));
}

console.log('Total splits:', splits);
