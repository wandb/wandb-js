import {test, expect} from '@jest/globals';
import {runStack} from './wandb_init.js';
import wandb from '../index.js';

test('Test simple log case', async () => {
  await wandb.init({config: {test: 1}});
  wandb.log({acc: 0.9, loss: 0.1});
  wandb.log({acc: 0.91, loss: 0.09});
  await wandb.finish();
  // TODO: better assertions
  expect(wandb.runPromise).toEqual(null);
  expect(runStack.size).toEqual(0);
});
