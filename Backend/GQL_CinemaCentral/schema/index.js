import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';

const filename  = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const typesArray = loadFilesSync(path.join(dirname, "../**/*.graphql"));
const typeDefs = mergeTypeDefs(typesArray);
export default typeDefs;