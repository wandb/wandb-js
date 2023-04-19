import {Run} from './wandb_run.js';
import {
  Messenger,
  ReceiverRecord,
  initRunPayload,
} from './interface/messenger.js';
import {Settings, settingsWithOverrides} from './settings.js';
import wandb from '../index.js';
import {debugLog} from './lib/util.js';
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
  wandb.runPromise = new Promise((resolve, reject) => {
    const settings = settingsWithOverrides(opts.settings);
    new Promise<Settings>((settingsResolve, settingsReject) => {
      // Ensure we're authenticated
      if (settings.apiKey === '') {
        debugLog('enforcing api key');
        login({
          key: settings.apiKey,
          host: settings.baseUrl,
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

        const messenger = new Messenger(settings);
        function exitHandler(signal: string): Promise<void> {
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

        // TODO: maybe move this logic into messenger?
        messenger.port.on('message', (msg: ReceiverRecord) => {
          if (msg.type === 'run') {
            debugLog('wandb.init finished');
            const run = new Run(
              msg.payload.project,
              msg.payload.entity,
              msg.payload.name,
              messenger,
              settings,
              msg.payload.displayName || opts.name
            );
            runStack.add(run);
            resolve(run);
          } else if (msg.type === 'error') {
            reject(msg.payload);
          } else {
            // TODO: other stuff
          }
        });
        // TODO: shutdown here as well?
        messenger.port.on('error', reject);
        messenger.port.on('exit', code => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
        messenger.init(initRunPayload(opts)).catch(e => {
          messenger.terminate().then(() => reject(e), reject);
        });
      })
      .catch(reject);
  });
  return wandb.runPromise;
}
