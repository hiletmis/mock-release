import { ChainElement, getChains, dapis } from '@api3/dapi-management';
import * as fs from 'fs';
import * as path from 'path';

import { format, Options } from 'prettier';

export const prettyJson = async (payload: any) => {
  const options = {
    bracketSpacing: true,
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'es5',
    useTabs: false
  } as Options;

  return await format(JSON.stringify(payload), { semi: false, parser: 'json', ...options });
};

export const writeJsonFile = async (path: string, payload: any) => {
  const formatted = await prettyJson(payload);
  fs.writeFileSync(path, formatted);
};

async function main() {
  await Promise.all(
    getChains().map(async (chain: ChainElement) => {
      console.log(`Chain: ${chain.alias}`);

      const directory = path.join(__dirname, `../gh-pages/market`, chain.id);

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      for (let dapi of dapis) {
        writeJsonFile(path.join(__dirname, `../gh-pages/market/${chain.id}/${dapi.name.replace('/', '-')}.json`), dapi);
      }
    })
  );

  const marketDirectory = path.join(__dirname, `../gh-pages/market`);

  // Generate a random number between 0 and 1000
  const randomNumber = Math.floor(Math.random() * 1000);

  // Create a JSON object with the random number
  const randomData = {
    randomNumber,
    timestamp: new Date().toISOString()
  };

  // Write the random number to a JSON file
  await writeJsonFile(path.join(marketDirectory, 'random-number.json'), randomData);
}

main();
