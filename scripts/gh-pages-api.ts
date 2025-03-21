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

    await Promise.all(getChains().map(async (chain: ChainElement ) => {
        console.log(`Chain: ${chain.alias}`);

        const directory = path.join(__dirname, `../gh-pages`, chain.id);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        for (let dapi of dapis) {
            writeJsonFile(path.join(__dirname, `../gh-pages/${chain.id}/${dapi.name.replace('/', '-')}.json`), dapi);
        }
    }));
}


main()