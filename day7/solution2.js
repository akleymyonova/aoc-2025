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

let timelinesByIndex = {
  [startIndex]: 1
}

for (let i = 2; i < parsedInput.length; i+=2) {
  const newTimelinesByIndex = getAlternateTimeLinesByIndex(parsedInput[i], timelinesByIndex);
  timelinesByIndex = newTimelinesByIndex;
}

const timelinesSum = Object.values(timelinesByIndex).reduce((acc, val) => acc + val, 0);

console.log('Total timelines:', timelinesSum);


function getAlternateTimeLinesByIndex(line, timelinesByIndex) {
  const alternateTimelinesByIndex = {};

  for (const [indexStr, timelinesCount] of Object.entries(timelinesByIndex)) {
    const index = Number(indexStr);

    if (line[index] === SPLITTER_CHAR) {
      const leftIndex = index - 1;
      const rightIndex = index + 1;

      addToTimelinesByIndex(alternateTimelinesByIndex, leftIndex, timelinesCount);

      addToTimelinesByIndex(alternateTimelinesByIndex, rightIndex, timelinesCount);
    } else {
      addToTimelinesByIndex(alternateTimelinesByIndex, index, timelinesCount);
    }
  }

  return alternateTimelinesByIndex;
}

function addToTimelinesByIndex(timelinesByIndex, index, count) {
  if (!timelinesByIndex[index]) {
    timelinesByIndex[index] = 0;
  }
  timelinesByIndex[index] += count;
}
