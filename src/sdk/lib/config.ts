import {version} from './version.js';

/* eslint-disable no-process-env */
export const config = () => ({
  VERSION: version,
  DEBUG: readEnv('WANDB_DEBUG') === 'true',
  ENV: readEnv('WANDB_ENV', 'production'),
  ENABLE_WORKER: readEnv('WANDB_WORKER') === 'true',
  MODE: readEnv('WANDB_MODE', 'online'),
  API_KEY: readEnv('WANDB_API_KEY'),
  API_URL: readEnv('WANDB_BASE_URL'),
  APP_URL: readEnv('WANDB_APP_URL'),
  WIN_HOME:
    readEnv('HOME') ||
    (readEnv('HOMEDRIVE') &&
      readEnv('HOMEPATH') &&
      `${readEnv('HOMEDRIVE')}\\${readEnv('HOMEPATH')}`) ||
    readEnv('USERPROFILE'),
});

export function readEnv(key: string, fallback = ''): string {
  if (typeof process === 'undefined') {
    return sessionStorage.getItem(key) || fallback;
  }
  return process.env[key] || fallback;
}
