import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

const result = []; // array of numbers

for (const line of parsedInput) {
  let num = 0;

  for (let i = 9; i > 0; i--) {
    const digitIndex = getDigitIndex(line, i);

    console.log(`Checking line ${line} for digit ${i}, found at index ${digitIndex}`, digitIndex !== -1 && digitIndex < line.length - 1);

    if (digitIndex !== -1 && digitIndex < line.length - 1) {
      num = +i * 10;
      const rest = line.slice(digitIndex + 1);

      for (let i = 9; i > 0; i--) {
        const index = getDigitIndex(rest, i);

        if (index !== -1) {
          num += +i;

          console.log(`For line ${line}, found tens digit ${Math.floor(num / 10)} and units digit ${num % 10}, forming number ${num}`);
          result.push(num);
          break;
        }
      }

      break;
    }
  }
}

const sum = result.reduce((acc, curr) => acc + curr, 0);

console.log('The result is:', sum);

function getDigitIndex(joltage, digit) {
  return `${joltage}`.indexOf(`${digit}`);
}