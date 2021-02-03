import { program } from 'commander';
import { scaffold } from './scaffold';
import { version } from '../package.json';

program.description('initialize a new coc extension').version(version);
program.arguments('[path]');
program.option('-p, --path [path]', 'path to store extension');
program.parse();

let dest = '';
if (program.args.length) {
  dest = program.args[0];
} else {
  dest = program.opts().path;
}
if (!dest) program.help();

scaffold(dest);
