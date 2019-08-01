import * as inquirer from 'inquirer';
import { basename } from 'path';
const { name } = require('validate-npm-package-name');
const { guessAuthor, guessEmail } = require('conjecture');

const validate = {
  notEmpty: (input: string) => input && input.length > 0,
  name: (input: string) => name(input).validForNewPackages
};

module.exports = (pkg: any, dest: string) =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'license',
      message: 'choose a license:',
      choices: ['MIT', 'GPL'], //TODO
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'author',
      message: 'author full name:',
      default: guessAuthor,
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'email',
      message: 'author email address:',
      default: guessEmail,
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'title',
      message: 'project title:',
      default: basename(dest),
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'description',
      message: 'project description:',
      default: pkg.description,
      filter: (input: string) => input.trim()
    },
    {
      type: 'input',
      name: 'topics',
      message: 'keywords to use (comma separated):',
      default: pkg.keywords ? pkg.keywords.join(', ') : null,
      filter: input =>
        input
          .trim()
          .split(',')
          .map((keyword: string) => keyword.trim()),
      validate: validate.notEmpty
    }
  ]);
