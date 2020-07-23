import * as inquirer from 'inquirer';
import { basename } from 'path';
import { getGitUseremail, getGitUsername } from './util';

const validate = {
  notEmpty: (input: string) => input && input.length > 0,
};

export async function questions(dest: string): Promise<any> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Project title:',
      default: basename(dest),
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: '',
      filter: (input: string) => input.trim(),
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author full name:',
      default: getGitUsername(),
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty,
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email address:',
      default: getGitUseremail(),
      filter: (input: string) => input.trim(),
      validate: validate.notEmpty,
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'npm',
      message: 'Install node dependencies?',
      default: true,
    },
  ]);
}
