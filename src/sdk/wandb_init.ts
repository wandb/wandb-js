import {Run} from './wandb_run.js';
import {Messenger, initRunPayload} from './interface/messenger.js';
import {Settings, settingsWithOverrides} from './settings.js';
import wandb from '../index.js';
import {debugLog} from './lib/util.js';
import {generateId} from './lib/runid.js';
import {login} from './wandb_login.js';

export type InitOptions = {
  project?: string;
  entity?: string;
  id?: string;
  name?: string;
  config?: any;
  job_type?: string;
  tags?: string[];
  dir?: string;
  resume?: boolean | string;
  mode?: string;
  notes?: string;
  save_code?: boolean;
  settings?: Settings;
};

export const runStack = new Set<Run>();

export async function init(opts: InitOptions = {}): Promise<Run> {
  // eslint-disable-next-line no-param-reassign
  opts.id = opts.id || (await generateId());
  wandb.runPromise = new Promise((resolve, reject) => {
    const settings = settingsWithOverrides(opts.settings);
    new Promise<Settings>((settingsResolve, settingsReject) => {
      // Ensure we're authenticated
      if (settings.apiKey === '') {
        debugLog('enforcing api key');
        login({
          key: settings.apiKey,
          host: settings.baseUrl,
          timeout: 10_000,
        })
          .then(key => {
            settings.apiKey = key;
            settingsResolve(settings);
          })
          .catch(settingsReject);
      } else {
        settingsResolve(settings);
      }
    })
      .then(settings => {
        debugLog('wandb.init started');
        // eslint-disable-next-line no-param-reassign
        opts.settings = settings;

        const messenger = new Messenger(settings, resolve);

        function exitHandler(signal: string): Promise<void> {
          // TODO: messenger may not be ready yet, move this into finish
          messenger.port.postMessage({
            type: 'finish',
            payload: {code: 0, signal},
          });
          return messenger.terminate();
        }
        // TODO: wasn't working for `.exit` in REPL
        process.once('beforeExit', () => {
          exitHandler('exit').catch(reject);
        });
        process.once('SIGTERM', () => {
          exitHandler('term').catch(reject);
        });
        process.once('SIGINT', () => {
          // TODO: maybe add timer.
          exitHandler('int').then(() => {
            process.exit();
          }, reject);
        });

        messenger.init(initRunPayload(opts)).catch(e => {
          messenger.terminate().then(() => reject(e), reject);
        });
      })
      .catch(reject);
  });
  return wandb.runPromise;
}
