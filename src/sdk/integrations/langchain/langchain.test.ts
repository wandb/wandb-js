import {test, expect} from '@jest/globals';
import {OpenAI} from 'langchain/llms/openai';
import {PromptTemplate} from 'langchain/prompts';
import {LLMChain} from 'langchain/chains';
import {WandbTracer} from './index.js';
import wandb from '../../../index.js';

export const run = async () => {
  const model = new OpenAI({temperature: 0});
  const template = 'What is a good name for a company that makes {product}?';
  const prompt = new PromptTemplate({template, inputVariables: ['product']});
  const chainA = new LLMChain({llm: model, prompt});
  const resA = await chainA.call({product: 'colorful socks'});
  return resA;
};

test('Test basic LangChain integration', async () => {
  await WandbTracer.watchAll({project: 'langchain-test'});
  expect(wandb.runPromise).not.toEqual(null);
  const res = await run();
  await WandbTracer.stopWatch();
  // TODO: better assertions
  expect(wandb.runPromise).toEqual(null);
  expect(res.text).toContain('Socktastic!');
});
