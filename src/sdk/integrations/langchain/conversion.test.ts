import {test, expect} from '@jest/globals';
import {LLMRun} from './types.js';
import {
  convertLcRunToWbSpan,
  safeMaybeModelDict,
  getSpanProducingObject,
} from './conversion.js';
import {WBTraceTree} from '../../data_types/trace_tree.js';

test('Test LLM Conversion', async () => {
  const run: LLMRun = {
    start_time: Date.now(),
    end_time: 0,
    serialized: {name: 'test'},
    prompts: ['hello world'],
    session_id: 1,
    execution_order: 1,
    type: 'llm',
  };
  const tree = new WBTraceTree(
    convertLcRunToWbSpan(run),
    safeMaybeModelDict(getSpanProducingObject(run))
  );
  expect(tree.toJSON()._type).toEqual('wb_trace_tree');
  const parsedConv = JSON.parse(tree.toJSON().root_span_dumps as string);
  parsedConv.start_time_ms = 100;
  expect(parsedConv).toEqual({
    attributes: {
      execution_order: 1,
    },
    end_time_ms: 0,
    name: 'test',
    results: [],
    span_id: null,
    span_kind: 'LLM',
    start_time_ms: 100,
    status_code: 'SUCCESS',
  });
});
