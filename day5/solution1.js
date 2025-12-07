import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

let freshAvailableIngredientsCount = 0;

const delimiterIndex = parsedInput.indexOf('');
const freshIngredientsRanges = parsedInput.slice(0, delimiterIndex);
const availableIngredients = parsedInput.slice(delimiterIndex + 1);

for (const ingredient of availableIngredients) {
  if (isIngredientFresh(ingredient, freshIngredientsRanges)) {
    freshAvailableIngredientsCount++;
  }
}

console.log('The number of fresh available ingredients is:', freshAvailableIngredientsCount);

function isIngredientFresh(ingredient, freshIngredientRanges) {
  for (const range of freshIngredientRanges) {
    const [from, to] = range.split('-');

    if (+ingredient >= +from && +ingredient <= +to) {
      return true;
    }
  }
  return false;
}