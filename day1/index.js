import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const MIN_POINT = 0;
const MAX_POINT = 99;

const START_POINT = 50;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);
let result = START_POINT;
let zerosCount = 0;

for (const instruction of parsedInput) {
  result = performRotation(result, instruction);
  console.log(`Current point after instruction ${instruction}: ${result}`);
}

console.log(`The final point is: ${result}`);
console.log(`The number of times the point was zero: ${zerosCount}`);

function performRotation(currentPoint, rotation) {
  const direction = rotation.charAt(0);
  const value = parseInt(rotation.slice(1));
  const range = MAX_POINT - MIN_POINT + 1; 

  let newPoint;

  if (direction === 'R') {
    newPoint = (currentPoint + value) % range;

    const startPos = currentPoint;
    const endPos = currentPoint + value;

    const firstZero = Math.floor(startPos / range) * range + range;

    if (firstZero <= endPos) {
      zerosCount += Math.floor((endPos - firstZero) / range) + 1;
    }
  } else {
    newPoint = ((currentPoint - value) % range + range) % range;

    const startPos = currentPoint;
    const endPos = currentPoint - value;

    if (endPos < 0 || startPos > 0) {
      const lastZero = Math.floor((startPos - 1) / range) * range;
      const firstZero = Math.ceil(endPos / range) * range;

      if (lastZero >= endPos && lastZero < startPos) {
        zerosCount += Math.floor((lastZero - firstZero) / range) + 1;
      }
    }
  }

  return newPoint;
}

