import {parseTxtFile} from '../utils/parseTxtFile.js';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, './input.txt'), 'utf-8');
const parsedInput = parseTxtFile(input);

const ROLLS_NEIGHTBOURS_THRESHOLD = 4;

let acesssibleRoles = 0;


for (let x = 0; x < parsedInput.length; x++) {
  const items = parsedInput[x].split('');

  for (let y = 0; y < items.length; y++) {

    const neighbors = [];

    if (x !== 0) {
      neighbors.push(parsedInput[x - 1][y]); // top middle

      if (y !== 0) {
        neighbors.push(parsedInput[x - 1][y - 1]); // top left
      }

      if (y !== items.length - 1) {
        neighbors.push(parsedInput[x - 1][y + 1]); // top right
      }
    }

    if (x !== parsedInput.length - 1) {
      neighbors.push(parsedInput[x + 1][y]); // bottom middle

      if (y !== items.length - 1) {
        neighbors.push(parsedInput[x + 1][y + 1]); // bottom right
      }

      if (y !== 0) {
        neighbors.push(parsedInput[x + 1][y - 1]); // bottom left
      }
    }

    if (y !== 0) {
      neighbors.push(parsedInput[x][y - 1]); // middle left
    }

    if (y !== items.length - 1) {
      neighbors.push(parsedInput[x][y + 1]); // middle right
    }

    const rollsNeighbours = neighbors.filter((n) => n === '@');

    if (items[y] === '@' && rollsNeighbours.length < ROLLS_NEIGHTBOURS_THRESHOLD) {
      acesssibleRoles++;
    }

    console.log('_____________________')
  }
}

console.log('The number of accessible rolls is:', acesssibleRoles);