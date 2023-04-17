import {Run} from './wandb_run.js';

export {init} from './wandb_init.js';
export {login} from './wandb_login.js';
export {Run} from './wandb_run.js';
export * as integrations from './integrations/index.js';

export var runPromise: Promise<Run> | null = null;

export async function log(data: object, step?: number, commit?: boolean) {
  if (runPromise == null) {
    throw new Error('Cannot log before calling wandb.init()');
  }
  // TODO: handle errors
  runPromise.then(run => run.log(data, step, commit));
}

export async function finish(code?: number) {
  if (runPromise == null) {
    throw new Error('Cannot finish before calling wandb.init()');
  }
  const run = await runPromise;
  await run.finish(code);
}
