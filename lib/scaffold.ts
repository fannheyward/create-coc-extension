import * as yargs from 'yargs';
import { join, resolve } from 'path';
import * as fs from 'fs';
import { questions } from './questions';

export async function scaffold(argv: yargs.Argv): Promise<void> {
  const dest = resolve(argv['path']);
  await fs.mkdirSync(dest, { recursive: true });

  let pkg = {};
  try {
    pkg = require(join(dest, 'package.json'));
  } catch (e) {}

  console.log(pkg);
  const answers = await questions(pkg, dest);
  console.log('answers', answers);
}
