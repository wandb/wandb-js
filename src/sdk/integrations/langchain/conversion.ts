/* eslint-disable import/no-extraneous-dependencies, no-empty, no-param-reassign, no-instanceof/no-instanceof */
import {BaseChain} from 'langchain/chains';
import {BaseLLM} from 'langchain/llms';
import {Tool} from 'langchain/tools';
import {BaseChatModel} from 'langchain/chat_models';
import {Run, BaseRun} from 'langchain/callbacks';
import {SpanKind, StatusCode} from '../../data_types/trace_tree.js';

class EmptySpan {
  _agentActionType(): string {
    return 'empty';
  }
}

type MaybeModels = BaseChain | BaseLLM | Tool | BaseChatModel | EmptySpan;

// TODO: type our spans
/* eslint-disable @typescript-eslint/no-explicit-any */
export function getSpanProducingObject(run: Run): MaybeModels {
  return (run.serialized as any)._self || new EmptySpan();
}

export function convertLcRunToWbSpan(run: Run): any {
  if (run.run_type === 'llm') {
    return convertLlmRunToWbSpan(run);
  }
  if (run.run_type === 'chain') {
    return convertChainRunToWbSpan(run);
  }
  if (run.run_type === 'tool') {
    return convertToolRunToWbSpan(run);
  }
  return convertRunToWbSpan(run);
}

function convertLlmRunToWbSpan(run: Run): any {
  const baseSpan = convertRunToWbSpan(run);

  if (run.outputs != null) {
    baseSpan.attributes.llm_output = run.outputs.llmOutput;
  }
  baseSpan.results = (run.inputs.prompts || []).map(
    (prompt: any, ndx: number) => ({
      inputs: {prompt},
      outputs:
        run.outputs != null &&
        run.outputs.generations.length > ndx &&
        run.outputs.generations[ndx].length > 0
          ? {generation: run.outputs.generations[ndx][0].text}
          : null,
    })
  );
  baseSpan.span_kind = SpanKind.LLM;

  return baseSpan;
}

export function convertChainRunToWbSpan(run: Run): any {
  const baseSpan = convertRunToWbSpan(run);

  baseSpan.results = [{inputs: run.inputs, outputs: run.outputs}];
  const childRuns: Run[] = run.child_runs;
  baseSpan.child_spans = childRuns.map((childRun: Run) =>
    convertLcRunToWbSpan(childRun)
  );
  const spanProducer = getSpanProducingObject(run);
  if (
    '_agentActionType' in spanProducer &&
    spanProducer._agentActionType() === 'single'
  ) {
    baseSpan.span_kind = SpanKind.AGENT;
  } else {
    baseSpan.span_kind = SpanKind.CHAIN;
  }

  return baseSpan;
}

export function convertToolRunToWbSpan(run: Run): any {
  const baseSpan = convertRunToWbSpan(run);
  const serialized = run.serialized as {name: string};
  baseSpan.attributes.action = JSON.stringify(serialized);
  baseSpan.results = [
    {inputs: {input: run.inputs.input}, outputs: {output: run.outputs?.output}},
  ];
  const childRuns: Run[] = run.child_runs;
  baseSpan.child_spans = childRuns.map((childRun: Run) =>
    convertLcRunToWbSpan(childRun)
  );
  baseSpan.span_kind = SpanKind.TOOL;

  return baseSpan;
}

export function convertRunToWbSpan(run: BaseRun): any {
  const attributes: any = {}; // 'extra' in run ? {...run.extra} : {};
  attributes.execution_order = run.execution_order;
  const serialized = run.serialized as {name: string};

  return {
    span_id: run.id != null ? String(run.id) : null,
    name: serialized.name,
    start_time_ms: run.start_time,
    end_time_ms: run.end_time,
    status_code: run.error == null ? StatusCode.SUCCESS : StatusCode.ERROR,
    status_message: run.error,
    attributes,
  };
}

export function safeMaybeModelDict(model: MaybeModels): any | null {
  let data = null;
  try {
    // @ts-expect-error: YOLO
    data = model.serialize();
  } catch (e) {}

  if (data == null && 'agent' in model) {
    try {
      // @ts-expect-error: YOLO
      data = model.agent.serialize();
    } catch (e) {}
  }

  if (data != null) {
    data = replaceTypeWithKind(data);
  }

  return data;
}

function replaceTypeWithKind(data: any): any {
  if (typeof data === 'object' && !Array.isArray(data)) {
    if ('_type' in data) {
      const {_type} = data;
      delete data._type;
      data._kind = _type;
    }
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, replaceTypeWithKind(v)])
    );
  }
  if (Array.isArray(data)) {
    return data.map(v => replaceTypeWithKind(v));
  }
  if (data instanceof Set) {
    return new Set(Array.from(data).map(v => replaceTypeWithKind(v)));
  }
  return data;
}
