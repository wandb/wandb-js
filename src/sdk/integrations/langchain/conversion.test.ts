import {test, expect} from '@jest/globals';
import {Run} from 'langchain/callbacks';
import {
  convertLcRunToWbSpan,
  safeMaybeModelDict,
  getSpanProducingObject,
} from './conversion.js';
import {WBTraceTree} from '../../data_types/trace_tree.js';

test('Test LLM Conversion', async () => {
  const run: Run = {
    start_time: Date.now(),
    end_time: 0,
    serialized: {name: 'test'},
    inputs: {prompts: ['hello world']},
    execution_order: 1,
    run_type: 'llm',
    child_runs: [],
    id: '1',
    name: 'test',
    child_execution_order: 2,
  };
  const tree = new WBTraceTree(
    convertLcRunToWbSpan(run),
    safeMaybeModelDict(getSpanProducingObject(run))
  );
  const json = tree.toJSON();
  expect(json._type).toEqual('wb_trace_tree');
  const parsedConv = JSON.parse(json.root_span_dumps as string);
  parsedConv.start_time_ms = 100;
  expect(parsedConv).toEqual({
    attributes: {
      execution_order: 1,
    },
    end_time_ms: 0,
    name: 'test',
    results: [
      {
        inputs: {
          prompt: 'hello world',
        },
        outputs: null,
      },
    ],
    span_id: '1',
    span_kind: 'LLM',
    start_time_ms: 100,
    status_code: 'SUCCESS',
  });
});
