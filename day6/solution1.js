import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

let matrix = parsedInput.map(line => line.split(' ').filter(Boolean));

const mantrixX = matrix[0].length;
const matrixY = matrix.length;

const results = [];

for (let i = 0; i < mantrixX; i++) {
  const operation = matrix[matrixY - 1][i];
  let result = +matrix[0][i];
  for (let j = 1; j < matrixY - 1; j++) {
    switch (operation) {
      case '+':
        result = result + +matrix[j][i];
        break;
      case '*':
        result = result * +matrix[j][i];
        break;
    }
  }

  results.push(result);
}

const resultsSum = results.reduce((acc, curr) => acc + curr, 0);

console.log('The sum of results is:', resultsSum);
