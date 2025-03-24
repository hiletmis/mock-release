
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const url = 'https://hiletmis.github.io/mock-release/market/random-number.json';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json() as { randomNumber: number, timestamp: string };
  console.log(json);

  const randomNumber = json.randomNumber;

  console.log(`Random number: ${randomNumber}`);
  console.log(`Timestamp: ${json.timestamp}`);

    const marketDirectory = path.join(__dirname, `../gh-pages/market`);

    const randomNumberFromLocal = fs.readFileSync(path.join(marketDirectory, 'random-number.json'), 'utf8');
    const randomNumberJson = JSON.parse(randomNumberFromLocal);
    const randomNumberLocal = randomNumberJson.randomNumber;

    if (randomNumber === randomNumberLocal) {
      console.log('Random numbers match');
    } else {
      console.log('Random numbers do not match');
    }

}

main();
