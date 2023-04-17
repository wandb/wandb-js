import {LLMRun, ChainRun, ToolRun} from './types.js';
import {SpanKind, StatusCode} from '../../data_types/trace_tree.js';

class EmptySpan {
  _agentActionType(): string {
    return 'empty';
  }
}

export function getSpanProducingObject(run: any): any {
  return run.serialized['_self'] || new EmptySpan();
}

export function convertLcRunToWbSpan(run: LLMRun | ChainRun | ToolRun): any {
  if ((run as LLMRun).prompts != null) {
    return convertLlmRunToWbSpan(run);
  } else if ((run as ChainRun).inputs != null) {
    return convertChainRunToWbSpan(run);
  } else if ((run as ToolRun).tool_input != null) {
    return convertToolRunToWbSpan(run);
  } else {
    return convertRunToWbSpan(run);
  }
}

function convertLlmRunToWbSpan(run: any): any {
  const baseSpan = convertRunToWbSpan(run);

  if (run.response != null) {
    baseSpan.attributes['llm_output'] = run.response.llm_output;
  }
  baseSpan.results = (run.serialized['prompts'] || []).map(
    (prompt: any, ndx: number) => {
      return {
        inputs: {prompt},
        outputs:
          run.response != null &&
          run.response.generations.length > ndx &&
          run.response.generations[ndx].length > 0
            ? {generation: run.response.generations[ndx][0].text}
            : null,
      };
    }
  );
  baseSpan.span_kind = SpanKind.LLM;

  return baseSpan;
}

export function convertChainRunToWbSpan(run: any): any {
  const baseSpan = convertRunToWbSpan(run);

  baseSpan.results = [{inputs: run.inputs, outputs: run.outputs}];
  baseSpan.child_spans = (run.child_runs || []).map((child_run: any) =>
    convertLcRunToWbSpan(child_run)
  );
  baseSpan.span_kind =
    getSpanProducingObject(run)._agentActionType() === 'single'
      ? SpanKind.AGENT
      : SpanKind.CHAIN;

  return baseSpan;
}

export function convertToolRunToWbSpan(run: any): any {
  const baseSpan = convertRunToWbSpan(run);

  baseSpan.attributes['action'] = run.action;
  baseSpan.results = [
    {inputs: {input: run.tool_input}, outputs: {output: run.output}},
  ];
  baseSpan.child_spans = run.child_runs.map((child_run: any) =>
    convertLcRunToWbSpan(child_run)
  );
  baseSpan.span_kind = SpanKind.TOOL;

  return baseSpan;
}

export function convertRunToWbSpan(run: any): any {
  const attributes = run.extra ? {...run.extra} : {};
  attributes['execution_order'] = run.execution_order;

  return {
    span_id: run.id != null ? String(run.id) : null,
    name: run.serialized['name'],
    start_time_ms: run.start_time,
    end_time_ms: run.end_time,
    status_code: run.error == null ? StatusCode.SUCCESS : StatusCode.ERROR,
    status_message: run.error,
    attributes,
  };
}

export function safeMaybeModelDict(model: any): any | null {
  let data = null;
  try {
    data = model.dict();
  } catch (e) {}

  if (data == null && model.hasOwnProperty('agent')) {
    try {
      data = model.agent.dict();
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
      const _type = data._type;
      delete data._type;
      data._kind = _type;
    }
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, replaceTypeWithKind(v)])
    );
  } else if (Array.isArray(data)) {
    return data.map(v => replaceTypeWithKind(v));
  } else if (data instanceof Set) {
    return new Set(Array.from(data).map(v => replaceTypeWithKind(v)));
  } else {
    return data;
  }
}
