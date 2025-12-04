import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const NUMBER_LENGTH = 12;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

const result = []; // array of numbers

for (const line of parsedInput) {
  let restLine = line;
  let resultNum = '';
  
  for(let counter = NUMBER_LENGTH; counter > 0; counter--) {
    console.log('restLine at start of iteration:', restLine, 'counter:', counter, 'max index to search:', restLine.length - counter);
    const highestDigitIndex = getHighestDigitIndex(restLine, restLine.length - counter + 1 );

    console.log('Highest digit index found:', highestDigitIndex);

    if (highestDigitIndex !== -1) {
      resultNum += restLine[highestDigitIndex];
      restLine = restLine.slice(highestDigitIndex + 1);
    }
  }

  console.log(`For line ${line}, formed number ${resultNum}`);
  result.push(+resultNum);
}

const sum = result.reduce((acc, curr) => acc + curr, 0);

console.log('The result is:', sum);




  // for (let i = 9; i > 0; i--) {
  //   const digitIndex = getDigitIndex(line, i);

  //   console.log(`Checking line ${line} for digit ${i}, found at index ${digitIndex}`, digitIndex !== -1 && digitIndex < line.length - 1);

  //   if (digitIndex !== -1 && digitIndex < line.length - 1) {
  //     num = +i * 10;
  //     const rest = line.slice(digitIndex + 1);

  //     for (let i = 9; i > 0; i--) {
  //       const index = getDigitIndex(rest, i);

  //       if (index !== -1) {
  //         num += +i;

  //         console.log(`For line ${line}, found tens digit ${Math.floor(num / 10)} and units digit ${num % 10}, forming number ${num}`);
  //         result.push(num);
  //         break;
  //       }
  //     }

  //     break;
  //   }
  // }
// }

function getHighestDigitIndex(sequence, maxIndex) {
  for (let digit = 9; digit > 0; digit--) {
        const index = getDigitIndex(sequence, digit);

        if (index !== -1 && index < maxIndex) {
          return index;
        }
      }
}

// const sum = result.reduce((acc, curr) => acc + curr, 0);

// console.log('The result is:', sum);

function getDigitIndex(joltage, digit) {
  return `${joltage}`.indexOf(`${digit}`);
}