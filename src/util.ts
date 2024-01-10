import { execSync, spawn } from 'child_process';
import os from 'os';
import { chdir } from 'process';
import which from 'which';

function runCommand(cmd: string, args?: readonly string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, args);
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      process.stdout.write(chunk.toString());
    });

    child.on('error', reject);
    let err = '';
    child.stderr.on('data', (data) => {
      err += data;
    });
    child.on('exit', (code) => {
      if (code) {
        console.error(`Error: ${code}, ${err}`);
      }
      resolve();
    });
  });
}

function getGitConfig(): object | undefined {
  const gitPath = which.sync('git', { nothrow: true });
  if (!gitPath) {
    return;
  }

  let config = {};
  const cmd = 'git config --list';
  const stdout = execSync(cmd).toString();
  const eol = os.platform() === 'win32' ? '\n' : os.EOL;
  stdout
    .split(eol)
    .filter((line) => !!line)
    .forEach((line) => {
      let [key, val] = line.split('=');
      if (val === undefined) {
        return;
      }
      config[key] = val;
    });

  return config;
}

export function getGitUsername(): string | undefined {
  const cfg = getGitConfig();
  if (!cfg) {
    return;
  }

  return cfg['user.name'];
}

export function getGitUseremail(): string | undefined {
  const cfg = getGitConfig();
  if (!cfg) {
    return;
  }

  return cfg['user.email'];
}

export async function gitInit(dest: string) {
  chdir(dest);

  const gitPath = which.sync('git', { nothrow: true });
  if (!gitPath) {
    return;
  }

  const cmd = 'git init --quiet';
  execSync(cmd).toString();
}

export async function npmInstall(dest: string) {
  chdir(dest);

  await runCommand('npm', ['install']);
}
