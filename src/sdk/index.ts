import type {Run} from './wandb_run.js';
import {init} from './wandb_init.js';
import {login} from './wandb_login.js';

export interface SDK {
  init: typeof init;
  login: typeof login;
  log: typeof log;
  finish: typeof finish;
  runPromise: Promise<Run> | null;
}

const sdk: SDK = {
  init,
  login,
  log,
  finish,
  runPromise: null,
};

function log(
  data: Record<string, unknown>,
  step?: number,
  commit?: boolean
): void {
  if (sdk.runPromise == null) {
    throw new Error('Cannot log before calling wandb.init()');
  }
  // TODO: handle errors
  sdk.runPromise
    .then(run => run.log(data, step, commit))
    .catch(e => {
      console.error(e);
    });
}

async function finish(code?: number) {
  if (sdk.runPromise == null) {
    throw new Error('Cannot finish before calling wandb.init()');
  }
  const run = await sdk.runPromise;
  await run.finish(code);
}

export default sdk;
