import {test, expect} from '@jest/globals';
import wandb from '../index.js';

test('Test simple log case', async () => {
  wandb.init({config: {test: 1}});
  wandb.log({acc: 0.9, loss: 0.1});
  wandb.log({acc: 0.91, loss: 0.09});
  await wandb.finish();
  // TODO: better assertions
  expect(wandb.runPromise).toEqual(null);
});
