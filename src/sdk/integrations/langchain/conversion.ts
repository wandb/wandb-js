/* eslint-disable import/no-extraneous-dependencies, no-empty, no-param-reassign, no-instanceof/no-instanceof */
import {BaseChain} from 'langchain/chains';
import {BaseLLM} from 'langchain/llms';
import {Tool} from 'langchain/tools';
import {BaseChatModel} from 'langchain/chat_models';
import {LLMRun, ChainRun, ToolRun, BaseRun} from './types.js';
import {SpanKind, StatusCode} from '../../data_types/trace_tree.js';

class EmptySpan {
  _agentActionType(): string {
    return 'empty';
  }
}

type MaybeModels = BaseChain | BaseLLM | Tool | BaseChatModel | EmptySpan;

export function getSpanProducingObject(run: BaseRun): MaybeModels {
  return run.serialized._self || new EmptySpan();
}

// TODO: type our spans
/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertLcRunToWbSpan(run: BaseRun): any {
  if ((run as LLMRun).prompts != null) {
    return convertLlmRunToWbSpan(run as LLMRun);
  }
  if ((run as ChainRun).inputs != null) {
    return convertChainRunToWbSpan(run as ChainRun);
  }
  if ((run as ToolRun).tool_input != null) {
    return convertToolRunToWbSpan(run as ToolRun);
  }
  return convertRunToWbSpan(run);
}

function convertLlmRunToWbSpan(run: LLMRun): any {
  const baseSpan = convertRunToWbSpan(run);

  if (run.response != null) {
    baseSpan.attributes.llm_output = run.response.llmOutput;
  }
  baseSpan.results = (run.prompts || []).map((prompt: any, ndx: number) => ({
    inputs: {prompt},
    outputs:
      run.response != null &&
      run.response.generations.length > ndx &&
      run.response.generations[ndx].length > 0
        ? {generation: run.response.generations[ndx][0].text}
        : null,
  }));
  baseSpan.span_kind = SpanKind.LLM;

  return baseSpan;
}

export function convertChainRunToWbSpan(run: ChainRun): any {
  const baseSpan = convertRunToWbSpan(run);

  baseSpan.results = [{inputs: run.inputs, outputs: run.outputs}];
  const childRuns: BaseRun[] = [
    ...run.child_llm_runs,
    ...run.child_chain_runs,
    ...run.child_tool_runs,
  ];
  baseSpan.child_spans = childRuns.map((childRun: BaseRun) =>
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

export function convertToolRunToWbSpan(run: ToolRun): any {
  const baseSpan = convertRunToWbSpan(run);

  baseSpan.attributes.action = run.action;
  baseSpan.results = [
    {inputs: {input: run.tool_input}, outputs: {output: run.output}},
  ];
  const childRuns: BaseRun[] = [
    ...run.child_llm_runs,
    ...run.child_chain_runs,
    ...run.child_tool_runs,
  ];
  baseSpan.child_spans = childRuns.map((childRun: BaseRun) =>
    convertLcRunToWbSpan(childRun)
  );
  baseSpan.span_kind = SpanKind.TOOL;

  return baseSpan;
}

export function convertRunToWbSpan(run: BaseRun): any {
  const attributes: any = {}; // 'extra' in run ? {...run.extra} : {};
  attributes.execution_order = run.execution_order;

  return {
    span_id: run.id != null ? String(run.id) : null,
    name: run.serialized.name,
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
