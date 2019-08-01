import * as yargs from 'yargs';
import { join, resolve, dirname } from 'path';
import * as fs from 'fs';
import * as glob from 'fast-glob';
import { promisify } from 'util';
const questions = require('./questions');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const template = join(__dirname, '..', 'template');

export async function scaffold(argv: yargs.Argv): Promise<void> {
  const dest = resolve(argv['path']);
  await fs.mkdirSync(dest, { recursive: true });

  let pkg = {};
  try {
    pkg = require(join(dest, 'package.json'));
  } catch (e) {}

  const answers = await questions(pkg, dest);

  answers.keywards = JSON.stringify(answers.topics);

  const stream = glob.stream('**/*', { cwd: template, dot: true });

  stream.on('data', async file => {
    console.log(file);
    const dir = dirname(file);

    if (dir !== '.') {
      await fs.mkdirSync(join(dest, dir), { recursive: true });
    }

    let content = await read(join(template, file), 'utf8');

    // replace each template key
    Object.entries(answers).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\[${key}\\]`, 'g'), <string>value);
    });

    // write file to destination
    await write(join(dest, file), content);

    // console message
    {
      /* console.log(`${green('created file')}: ${join(destination, file)}`); */
    }
    console.log(`'created file': ${join(dest, file)}`);
  });
}
