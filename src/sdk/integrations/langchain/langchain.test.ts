import {test, expect} from '@jest/globals';
import {OpenAI} from 'langchain/llms/openai';
import {PromptTemplate} from 'langchain/prompts';
import {LLMChain} from 'langchain/chains';
import {Calculator} from 'langchain/tools/calculator';
import {initializeAgentExecutorWithOptions} from 'langchain/agents';
import {WandbTracer} from './index.js';
import wandb from '../../../index.js';

export const run = async (mode = 'math') => {
  const model = new OpenAI({temperature: 0});
  if (mode === 'simple') {
    const template = 'What is a good name for a company that makes {product}?';
    const prompt = new PromptTemplate({template, inputVariables: ['product']});
    const WBLLMChain = WandbTracer.wrap(LLMChain);
    const chainA = new WBLLMChain({llm: model, prompt});
    const resA = await chainA.call({product: 'colorful socks'});
    return resA;
  }
  const tools = [new Calculator()];
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: 'zero-shot-react-description',
  });
  const result = await executor.call({
    input: 'What is 12 / 9 * 1981?',
  });
  return result;
};

test('Test basic LangChain integration', async () => {
  await WandbTracer.watchAll({project: 'langchain-test'});
  expect(wandb.runPromise).not.toEqual(null);
  const res = await run();
  await WandbTracer.stopWatch();
  // TODO: better assertions
  expect(wandb.runPromise).toEqual(null);
  expect(res.output).toContain('2641.3333');
});
