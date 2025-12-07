import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

const results = [];

const lengthInfos = getLengthsInfoFromOperationLine(parsedInput[parsedInput.length - 1]);

for (const lengthInfo of lengthInfos.reverse()) {
  let currentResult = 0;

  for (let i = 0; i < lengthInfo.length; i++) {
    let numberStr = '';

    for (let row = 0; row < parsedInput.length - 1; row++) {
      const numIndex = lengthInfo.offset + i;
      const num = parsedInput[row].slice(numIndex, numIndex + 1);

      if (num !== ' ') {
        numberStr += num;
      }
    }

    switch (lengthInfo.operation) {
      case '+':
        currentResult += +numberStr;
        break;
      case '*':
        if (currentResult === 0) {
          currentResult = +numberStr;
          break;
        }

        currentResult *= +numberStr;
        break;
    }
  }

  console.log('Current result for operation', lengthInfo.operation, 'is', currentResult);

  results.push(currentResult);
}


const resultsSum = results.reduce((acc, curr) => acc + curr, 0);

console.log('The sum of results is:', resultsSum);

function getLengthsInfoFromOperationLine(operationLine) {
  const lengthInfos = []; // {opration: '+' | '*', length: number; offset: number}[]

  let operation = '';
  let curLength = 0;
  for (let i = 0; i <= operationLine.length - 1; i++) {

    if (i === 0) {
      operation = operationLine[i];
      curLength++;
      continue;
    }

    if (i === operationLine.length - 1) {
      curLength++;
      lengthInfos.push({operation, length: curLength, offset: i - curLength + 1 });
      continue;
    }

    if (operationLine[i] === ' ') {
      curLength++;
    } else {
      lengthInfos.push({operation, length: curLength - 1, offset: i - curLength });
      curLength = 1;
      operation = operationLine[i];
    }
  }

  return lengthInfos;
}
