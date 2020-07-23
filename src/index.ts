import { Argv, command } from 'yargs';
import { scaffold } from './scaffold';

const builder: any = (yargs: Argv) => {
  yargs.positional('path', {
    desc: 'path to initialize in',
    type: 'string',
    default: '.',
  });
};

command('$0 [path]', 'initialize a new coc extension', builder, scaffold).help().argv;
