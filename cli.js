const scaffold = require('./lib/scaffold')
const yargs = require('yargs')

const builder = () => {
  yargs.positional('path', {
    desc: 'path to initialize in',
    type: 'string',
    default: '.'
  })
}

yargs.command('$0 [path]', 'initialize a new coc extension', builder, scaffold.scaffold).help().argv
