import { exec, ExecOptions, execSync } from 'child_process';
import os from 'os';
import { chdir } from 'process';
import which from 'which';

function runCommand(cmd: string, output?: string, opts: ExecOptions = {}, timeout?: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let timer: NodeJS.Timer;
    if (timeout) {
      timer = setTimeout(() => {
        reject(new Error(`timeout after ${timeout}s`));
      }, timeout * 1000);
    }

    exec(cmd, opts, (_err, stdout, stderr) => {
      if (timer) {
        clearTimeout(timer);
      }

      output ? resolve(stdout) : resolve(stderr);
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
    .filter(line => !!line)
    .forEach(line => {
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

export async function nodeInstall(dest: string) {
  chdir(dest);

  let bin = which.sync('yarnpkg', { nothrow: true });
  if (bin) {
    // yarn
    await runCommand(bin);
  } else {
    // npm
    bin = which.sync('npm', { nothrow: true });
    if (bin) {
      runCommand(`npm install`);
    }
  }
}
