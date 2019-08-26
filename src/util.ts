import { execSync } from 'child_process';
import os from 'os';
import which from 'which';

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
