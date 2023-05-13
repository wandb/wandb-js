import {test, expect} from '@jest/globals';
import {OpenAI} from 'langchain/llms/openai';
import {PromptTemplate} from 'langchain/prompts';
import {LLMChain} from 'langchain/chains';
import {CallbackManager} from 'langchain/callbacks';
import {Calculator} from 'langchain/tools/calculator';
import {initializeAgentExecutorWithOptions} from 'langchain/agents';
import {WandbTracer} from './index.js';
import wandb from '../../../index.js';

export const run = async (
  cbm?: CallbackManager,
  mode = 'math'
): Promise<any> => {
  const model = new OpenAI({temperature: 0});
  if (mode === 'simple') {
    const template = 'What is a good name for a company that makes {product}?';
    const prompt = new PromptTemplate({template, inputVariables: ['product']});
    const chainA = new LLMChain({llm: model, prompt});
    const resA = await chainA.call({product: 'colorful socks'}, cbm);
    return resA;
  }
  const tools = [new Calculator()];
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: 'zero-shot-react-description',
  });
  const result = await executor.call(
    {
      input: 'What is 12 / 9 * 1981?',
    },
    cbm
  );
  return result;
};

test('Test basic LangChain integration', async () => {
  const cbm = await WandbTracer.init({project: 'langchain-test'}, false);
  expect(wandb.runPromise).not.toEqual(null);
  const res = await run(cbm);
  await WandbTracer.finish();
  // TODO: better assertions
  expect(wandb.runPromise).toEqual(null);
  expect(res.output).toContain('2641.3333');
});
