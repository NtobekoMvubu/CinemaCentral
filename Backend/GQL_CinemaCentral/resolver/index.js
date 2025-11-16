import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { mergeResolvers } from '@graphql-tools/merge';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const files = fs.readdirSync(dirName).filter(f => f !== 'index.js' && f.endsWith('.js'));

const resolverArray = [];
for (const file of files) {
	const mod = await import(pathToFileURL(path.join(dirName, file)).href);
	resolverArray.push(mod.default || mod.resolvers || mod);
}

const resolvers = mergeResolvers(resolverArray);

export default resolvers;