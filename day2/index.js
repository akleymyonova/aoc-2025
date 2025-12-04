import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, '../input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

let invalidIDs = [];

for (const range of parsedInput[0].split(',')) {
  const [from, to] = range.split('-');

  const rangeInvalidIDs = findInvalidIDs(+from, +to);
  console.log(`Invalid IDs in range ${range}: ${rangeInvalidIDs.join(', ')}`);

  invalidIDs.push(...rangeInvalidIDs);
}

const invalidIDsSum = invalidIDs.reduce((acc, id) => acc + Number(id), 0);

console.log('the sum is:', invalidIDsSum);

function consistsOfSameDigitsSequence(id, digits) {
  if (!digits) return false;

  if (`${id}`.length % digits.length !== 0) return false;

  const repetitions = `${id}`.length / digits.length;

  if (repetitions < 2) return false;

  return `${digits}`.repeat(repetitions) === `${id}`;
}

function consistsOfSameDigits(id) {
  const numString = String(id);
  const uniqueDigits = new Set(numString);
  return uniqueDigits.size === 1 && numString.length >= 2;
}

function findInvalidIDs(from, to) {
  const invalidIDs = [];

  for (let id = from; id <= to; id++) {
    if (consistsOfSameDigits(id)) {
      invalidIDs.push(id);
      continue;
    }

    const mid = `${id}`.length / 2;

    for (let len = 2; len <= mid; len++) {
      const isSameDigitsSequence = consistsOfSameDigitsSequence(id, `${id}`.slice(0, len));
      if (isSameDigitsSequence) {
        invalidIDs.push(id);
        break;
      }
    }
  }
  return invalidIDs;
}