
async function main() {
  const url = 'https://hiletmis.github.io/mock-release/market/random-number.json';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);

  const randomNumber = json.randomNumber;

  console.log(`Random number: ${randomNumber}`);
  console.log(`Timestamp: ${json.timestamp}`);
}

main();
