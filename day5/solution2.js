import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

let freshIngredientsCount = 0;

const delimiterIndex = parsedInput.indexOf('');

const freshIngredientsRanges = parsedInput.slice(0, delimiterIndex);
const checkedIngredients = [];

for (const range of freshIngredientsRanges) {
  const [from, to] = range.split('-');
  const freshIngredientsInRange = countFreshIngredientsInRange(+from, +to)

  freshIngredientsCount += freshIngredientsInRange;

  console.log('Fresh ingredients in range', from, 'to', to, ':', freshIngredientsInRange);
  checkedIngredients.push([+from, +to])
}

console.log('The number of fresh available ingredients is:', freshIngredientsCount);

function countFreshIngredientsInRange(from, to) {
  // console.log('Counting fresh ingredients from', from, 'to', to);
  let count = to - from + 1;
  const overlaps = [];

  for (const [checkedFrom, checkedTo] of checkedIngredients) {
    if (from > checkedFrom && from > checkedTo) { // no overlap
      continue;
    }

    if (to < checkedFrom && to < checkedTo) { // no overlap
      continue;
    }

    // overlap, adjust the count
    const overlapFrom = Math.max(from, checkedFrom);
    const overlapTo = Math.min(to, checkedTo);

    let uncountedRanges = [[overlapFrom, overlapTo]];

    for (const [existingOverlapFrom, existingOverlapTo] of overlaps) {
      const newUncountedRanges = [];

      for (const [rangeFrom, rangeTo] of uncountedRanges) {
        if (rangeTo < existingOverlapFrom || rangeFrom > existingOverlapTo) {
          newUncountedRanges.push([rangeFrom, rangeTo]);
          continue;
        }

        if (rangeFrom < existingOverlapFrom) {
          newUncountedRanges.push([rangeFrom, existingOverlapFrom - 1]);
        }

        if (rangeTo > existingOverlapTo) {
          newUncountedRanges.push([existingOverlapTo + 1, rangeTo]);
        }
      }

      uncountedRanges = newUncountedRanges;
    }

    for (const [rangeFrom, rangeTo] of uncountedRanges) {
      const uncountedCount = rangeTo - rangeFrom + 1;
      count -= uncountedCount;
      overlaps.push([rangeFrom, rangeTo]);
    }
  }

  return count;
}