import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const url = 'https://hiletmis.github.io/mock-release/market/random-number.json';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);

  const randomNumber = json.randomNumber;

  const randomNumberFromFile = fs.readFileSync(path.join(__dirname, `../gh-pages/market/random-number.json`), 'utf8');
  const randomNumberJson = JSON.parse(randomNumberFromFile);
  const randomNumberFromFileValue = randomNumberJson.randomNumber;

  if (randomNumber === randomNumberFromFileValue) {
    console.log('The random numbers match!');
  } else {
    console.log('The random numbers do not match!');
  }
}

main();
