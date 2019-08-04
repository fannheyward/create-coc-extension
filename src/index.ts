import * as yargs from 'yargs';
import { scaffold } from './scaffold';

const builder: any = (yargs: yargs.Argv) => {
  yargs.positional('path', {
    desc: 'path to initialize in',
    type: 'string',
    default: '.'
  });
};

yargs.command('$0 [path]', 'initialize a new coc extension', builder, scaffold).help().argv;
