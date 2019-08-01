import * as inquirer from 'inquirer';

export async function questions(pkg, dest) {
  console.log('pkg', pkg, dest);
  inquirer.prompt([
    {
      type: 'list',
      name: 'license',
      message: 'choose a license:',
      choices: ['MIT', 'GPL'],
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'author',
      message: 'author full name:',
      default: guessAuthor,
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'email',
      message: 'author email address:',
      default: guessEmail,
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'website',
      message: 'author website:',
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'title',
      message: 'project title:',
      default: basename(destination),
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'description',
      message: 'project description:',
      default: pkg.description,
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'homepage',
      message: 'project homepage:',
      default: answers => pkg.homepage || answers.website,
      filter: input => input.trim(),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'org',
      message: 'user/org name:',
      default: answers => guessGitHubUsername(answers.email),
      filter: input => input.trim(),
      validate: validate.name
    },
    {
      type: 'input',
      name: 'name',
      message: 'package/repo name:',
      default: answers => (pkg.name ? pkg.name.split('/').pop() : kebab(answers.title)),
      filter: input => input.trim(),
      validate: validate.name
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
          .map(keyword => keyword.trim()),
      validate: validate.notEmpty
    },
    {
      type: 'input',
      name: 'twitter',
      message: 'twitter:',
      default: answers => guessGitHubUsername(answers.email),
      filter: input => input.trim(),
      validate: validate.notEmpty
    }
  ]);
}
