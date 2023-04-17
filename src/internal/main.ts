import {parentPort, workerData} from 'worker_threads';
import {Sender} from '../internal/sender.js';
import {InitOptions} from '../sdk/wandb_init.js';
import {defaultSettings} from '../sdk/settings.js';
import {debugLog} from '../sdk/lib/util.js';
import {initRunPayload} from '../sdk/interface/messenger.js';

export function main() {
  const opts: InitOptions = workerData;
  const settings = defaultSettings;
  if (opts.settings) {
    Object.assign(settings, opts.settings);
  }
  const payload = initRunPayload(opts);
  parentPort?.postMessage({type: 'run', payload});
  const sender = new Sender(settings, parentPort!);
  process.on('beforeExit', () => {
    debugLog('beforeExit worker');
    sender._shutdown = true;
  });
  sender._thread_body();
}
// TODO: we used this when we had workers, now we've simplified it
// main();
